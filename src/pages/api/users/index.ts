import type { NextApiRequest, NextApiResponse } from "next";
import { RowDataPacket } from "mysql2";
import {db} from "@/lib/db";
import { JwtPayload } from "jsonwebtoken";
import jwt from 'jsonwebtoken';

// ✅ Define the type for User rows
interface UserRow extends RowDataPacket {
  id: number;
  names: string;
  email: string;
  status: string;
  createdAt: string;
}

// ✅ Response shape
interface UsersResponse {
  message: string;
  users: UserRow[];
  total: number;
}

const JWT_SECRET = process.env.JWT_SECRET!;

interface AuthPayload extends JwtPayload {
  id: number;
  email: string;
}
  
export function verifyToken(req: NextApiRequest): AuthPayload {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new Error("Unauthorized");
  }

  const token = authHeader.split(" ")[1];

  try {
    // ✅ Verify and cast the token payload
    const decoded = jwt.verify(token, JWT_SECRET) as AuthPayload;
    if (!decoded.id) throw new Error("Invalid token payload");
    return decoded;
  } catch (err) {
    throw new Error("Invalid or expired token");
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<UsersResponse | { message: string }>) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    // ✅ 1. Verify that only admins can access this endpoint
    const admin = verifyToken(req);
    if (!admin || !admin.role) {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    // ✅ 2. Extract optional pagination & search query params
    const { page = "1", limit = "10", search } = req.query;
    const pageNumber = Math.max(parseInt(page as string, 10), 1);
    const pageSize = Math.max(parseInt(limit as string, 10), 1);
    const offset = (pageNumber - 1) * pageSize;

    // ✅ 3. Build query with search filter (if provided)
    let whereClause = "WHERE 1=1";
    const params: (string | number)[] = [];

    if (search) {
      whereClause += " AND (names LIKE ? OR email LIKE ?)";
      const q = `%${search}%`;
      params.push(q, q);
    }

    // ✅ 4. Get total users count
    const [countRows] = await db.query<RowDataPacket[]>(
      `SELECT COUNT(*) AS total FROM users ${whereClause}`,
      params
    );
    const total = (countRows[0] as { total: number }).total || 0;

    // ✅ 5. Get paginated users list
    const [users] = await db.query<UserRow[]>(
      `
      SELECT id, names, email, status, createdAt
      FROM users
      ${whereClause}
      ORDER BY createdAt DESC
      LIMIT ? OFFSET ?
      `,
      [...params, pageSize, offset]
    );

    // ✅ 6. Return response
    return res.status(200).json({
      message: "Users fetched successfully",
      users,
      total,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({
      message: "Server error",
    });
  }
}
