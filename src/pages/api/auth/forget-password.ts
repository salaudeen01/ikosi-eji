import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import crypto from "crypto";
import { senOtpMail } from "@/lib/forgetMailer";

interface RequestResetBody {
  email: string;
}

interface ApiResponse {
  message: string;
  error?: string;
  user?: {email: string} | null;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  if (req.method !== "POST") {
    return res.status(405).json({
      message: "Method Not Allowed",
      user: null
    });
  }

  try {
    const body: RequestResetBody = req.body;
    if (!body.email) {
      return res.status(400).json({
        message: "Email is required",
        user: null
      });
    }

    const user = await prisma.admin.findUnique({ where: { email: body.email } });
    console.log(user)
    if (!user) {
      return res.status(200).json({
        message: "If that email exists, a reset link has been sent",
        user: null
      });
    }

    // ✅ Generate reset token
    const token = crypto.randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 1000 * 60 * 60); // 1 hour

    await prisma.admin.update({
      where: { id: user.id },
      data: {
        resetPasswordToken: token,
        resetPasswordExpires: expires,
      },
    });

    // ✅ Send reset email  const resetUrl = `http://localhost:3001/admin/reset-password?token=${token}`;
    const resetUrl = `/${process.env.NEXT_PUBLIC_SITE_URL}/admin/reset-password?token=${token}`;
    await senOtpMail(
        user.email,
        resetUrl,
    )
    return res.status(200).json({ user:{email:user.email}, message: "If that email exists, a reset link has been sent" });
  } catch (error) {
    console.error("Error requesting password reset:", error);
    return res.status(500).json({
      message: "Server error",
      error: error instanceof Error ? error.message : "Unknown error",
      user: null
    });
  }
}
