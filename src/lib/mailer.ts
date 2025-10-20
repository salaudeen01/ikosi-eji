import nodemailer from "nodemailer";
import { adminWelcomeTemplate } from "./templates/adminWelcomeEmail";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export async function sendAdminWelcomeEmail(to: string, name?: string, password?: string) {
  const html = adminWelcomeTemplate(name, password);

  await transporter.sendMail({
    from: `"Admin System" <${process.env.GMAIL_USER}>`,
    to,
    subject: "🎉 Welcome to the Admin Portal",
    html,
  });
}
