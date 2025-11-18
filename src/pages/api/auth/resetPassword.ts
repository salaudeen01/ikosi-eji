import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

interface ResetPasswordBody {
  token: string;
  password: string;
}

interface ApiResponse {
  message: string;
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const body: ResetPasswordBody = req.body;
    if (!body.token || !body.password) {
      return res.status(400).json({ message: "Token and new password are required" });
    }

    const users = await prisma.admin.findMany();

    console.log(users)

    // ✅ Find user with valid token
    const user = await prisma.admin.findFirst({
      where: {
        resetPasswordToken: body.token,
        resetPasswordExpires: { gt: new Date() },
      },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    // ✅ Hash new password
    const hashedPassword = await bcrypt.hash(body.password, 10);

    await prisma.admin.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetPasswordToken: null,
        resetPasswordExpires: null,
      },
    });

    return res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Error resetting password:", error);
    return res.status(500).json({
      message: "Server error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
