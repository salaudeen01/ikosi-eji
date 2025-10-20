import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../lib/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

interface User {
  id: number;
  email: string;
  name: string;
  role: string;
  username: string;
  password: string;
  status: string;
}

interface LoginResponse {
  token?: string;
  user?: {
    id: number;
    email: string;
    name: string;
    role: string;
    username: string;
  };
  message?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<LoginResponse>
): Promise<void> {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  const { email, password } = req.body as {
    email?: string;
    password?: string;
  };

  if (!email || !password) {
    res.status(400).json({ message: "Email and password are required" });
    return;
  }

  try {
    const [rows] = await db.query("SELECT * FROM admin WHERE email = ?", [
      email,
    ]);

    // Ensure the result is typed properly
    const admin = rows as unknown as User[];

    if (admin.length === 0) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    const user = admin[0];

    if (user.status !== "active") {
      res
        .status(403)
        .json({ message: "Account is not active. Please contact support." });
      return;
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("JWT_SECRET is not defined in environment variables");
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        username: user.username,
      },
      secret,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        username: user.username,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
