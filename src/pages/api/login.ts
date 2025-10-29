/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import {db} from "@/lib/db";
import bcrypt from "bcryptjs";
import { logActivity } from "@/lib/logActivity";

const JWT_SECRET = process.env.JWT_SECRET!;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" });
  }

  try {
    const [rows] = await db.query(`SELECT * FROM users WHERE email = ? AND status = 'active'`, [email]);
    const user = (rows as any[])[0];

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, names: user.names },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    // ✅ Automatically log who did this
    await logActivity({
      req,
      action: "USER_LOGIN",
      id: user.id,
      type: 'users',
      description: `${user.names} with email ${user.email} loged in`,
    });

    return res.status(200).json({
      message: "Login successful",
      token,
      user: { id: user.id, names: user.names, email: user.email },
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "Server error" });
  }
}
