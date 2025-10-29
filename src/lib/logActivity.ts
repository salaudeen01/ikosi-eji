import { db } from "@/lib/db";
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
  id?:number;
  type?: string
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

    // ✅ if no token (e.g., login), fall back to provided id + role
    if (!token && id) {
        if (type === "admin") adminId = id;
        else userId = id;
      }

    const ipAddress = req.socket.remoteAddress || null;
    const userAgent = req.headers["user-agent"] || null;

    await db.query(
      `INSERT INTO activity_logs (userId, adminId, action, description, ipAddress, userAgent)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [userId, adminId, action, description || null, ipAddress, userAgent]
    );
  } catch (error) {
    console.error("Error logging activity:", error);
  }
}
