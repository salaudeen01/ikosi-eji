import prisma from "@/lib/prisma"; // Make sure you have a shared Prisma client
import jwt from "jsonwebtoken";
import { NextApiRequest } from "next";

// Adjust this type for your token payload
interface JwtPayload {
  id: number;
  role?: "user" | "admin";
  email?: string;
}

interface LogPayload {
  req: NextApiRequest; // we use this to read token, ip, user-agent
  action: string;
  description?: string;
  id?: number;
  type?: "user" | "admin";
}

export async function logActivity({ req, action, description, id, type }: LogPayload) {
  try {
    // ✅ Extract token from header or cookie
    const authHeader = req.headers.authorization;
    const token =
      authHeader?.startsWith("Bearer ") && authHeader.split(" ")[1]
        ? authHeader.split(" ")[1]
        : (req.cookies?.token as string | undefined);

    let userId: number | null = null;
    let adminId: number | null = null;

    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
        if (type === "admin") adminId = decoded.id;
        else userId = decoded.id;
      } catch (err) {
        console.warn("Invalid JWT in logActivity");
      }
    }

    // ✅ Fallback if no token (e.g., login)
    if (!token && id) {
      if (type === "admin") adminId = id;
      else userId = id;
    }

    const ipAddress = req.socket.remoteAddress || null;
    const userAgent = req.headers["user-agent"] || null;

    // ✅ Use Prisma to insert the log
    await prisma.activityLog.create({
      data: {
        action,
        description: description || null,
        ipAddress,
        userAgent,
        userId,
        adminId,
      },
    });
  } catch (error) {
    console.error("Error logging activity:", error);
  }
}
