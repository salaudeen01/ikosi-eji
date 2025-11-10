import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";

interface UsersResponse {
  message: string;
  users: {
    id: number;
    names: string;
    email: string;
    status: string;
    createdAt: Date;
  }[];
  total: number;
}

interface AuthPayload {
  id: number;
  email: string;
  role: string;
}

const JWT_SECRET = process.env.JWT_SECRET!;

// ✅ Verify token helper
function verifyToken(req: NextApiRequest): AuthPayload {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    throw new Error("Unauthorized");
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as AuthPayload;
    if (!decoded.id) throw new Error("Invalid token payload");
    return decoded;
  } catch {
    throw new Error("Invalid or expired token");
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UsersResponse | { message: string }>
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    // ✅ Only admin access
    const admin = verifyToken(req);
    if (!admin || admin.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    // ✅ Pagination & search
    const { page = "1", limit = "10", search } = req.query;
    const pageNumber = Math.max(parseInt(page as string, 10), 1);
    const pageSize = Math.max(parseInt(limit as string, 10), 1);
    const skip = (pageNumber - 1) * pageSize;

    // ✅ Build where clause
    const where: { OR?: { names?: { contains: string; mode: "insensitive" }; email?: { contains: string; mode: "insensitive" } }[] } = {};
    if (search) {
      where.OR = [
        { names: { contains: search as string, mode: "insensitive" } },
        { email: { contains: search as string, mode: "insensitive" } },
      ];
    }

    // ✅ Get total users count
    const total = await prisma.user.count({ where });

    // ✅ Get paginated users
    const users = await prisma.user.findMany({
      where,
      select: {
        id: true,
        names: true,
        email: true,
        status: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
      skip,
      take: pageSize,
    });

    return res.status(200).json({
      message: "Users fetched successfully",
      users,
      total,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ message: "Server error" });
  }
}
