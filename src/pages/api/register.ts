/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma"; // Shared Prisma client
import { logActivity } from "@/lib/logActivity";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { names, email, password } = req.body;

  if (!names || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // ✅ Check if email already exists
    const existing = await prisma.user.findUnique({
      where: { email },
      select: { id: true },
    });

    if (existing) {
      return res.status(409).json({ message: "Email already registered" });
    }

    // ✅ Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Create user
    const newUser = await prisma.user.create({
      data: {
        names,
        email,
        password: hashedPassword,
      },
    });

    // ✅ Log activity
    await logActivity({
      req,
      action: "USER_REGISTRATION",
      type: "user",
      id: newUser.id,
      description: `New member registered: ${names} (${email})`,
    });

    return res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Register error:", err);
    return res.status(500).json({ message: "Server error" });
  }
}
