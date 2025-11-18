import nodemailer from "nodemailer";
import { forgetTemplate } from "./templates/forgetPass";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export async function senOtpMail(to: string, resetUrl?: string) {
  const html = forgetTemplate(to, resetUrl);


  await transporter.sendMail({
    // from: `"Admin System" <${process.env.GMAIL_USER}>`,
    from: `"Admin System" <Ecometricsnews>`,
    to,
    subject: "Password Reset Request",
    html,
  });
}
