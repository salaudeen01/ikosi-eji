import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/db";
import { RowDataPacket } from "mysql2";

interface ActivityLogRow extends RowDataPacket {
  id: number;
  action: string;
  description: string | null;
  ipAddress: string | null;
  userAgent: string | null;
  createdAt: string;
  userName: string | null;
  userEmail: string | null;
  adminName: string | null;
  adminEmail: string | null;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const { page = "1", limit = "10", userId, adminId, action, search } = req.query;

    const pageNumber = Math.max(parseInt(page as string, 10), 1);
    const pageSize = Math.max(parseInt(limit as string, 10), 1);
    const offset = (pageNumber - 1) * pageSize;

    const params: (string | number)[] = [];
    let whereClause = "WHERE 1=1";

    // ✅ Optional filters
    if (userId) {
      whereClause += " AND l.userId = ?";
      params.push(Number(userId));
    }

    if (adminId) {
      whereClause += " AND l.adminId = ?";
      params.push(Number(adminId));
    }

    if (action) {
      whereClause += " AND l.action LIKE ?";
      params.push(`%${action}%`);
    }

    // ✅ New: search filter
    if (search) {
      whereClause += `
        AND (
          l.action LIKE ?
          OR l.description LIKE ?
          OR u.names LIKE ?
          OR u.email LIKE ?
          OR a.name LIKE ?
          OR a.email LIKE ?
        )
      `;
      const like = `%${search}%`;
      params.push(like, like, like, like, like, like);
    }

    // ✅ Count total records
    const [countRows] = await db.query<RowDataPacket[]>(`
      SELECT COUNT(*) AS total
      FROM activity_logs l
      LEFT JOIN users u ON l.userId = u.id
      LEFT JOIN admin a ON l.adminId = a.id
      ${whereClause}
    `, params);
    const total = (countRows[0]?.total as number) || 0;

    // ✅ Fetch paginated logs
    const [logs] = await db.query<ActivityLogRow[]>(`
      SELECT 
        l.id,
        l.action,
        l.description,
        l.ipAddress,
        l.userAgent,
        l.createdAt,
        u.names AS userName,
        u.email AS userEmail,
        a.name AS adminName,
        a.email AS adminEmail
      FROM activity_logs l
      LEFT JOIN users u ON l.userId = u.id
      LEFT JOIN admin a ON l.adminId = a.id
      ${whereClause}
      ORDER BY l.createdAt DESC
      LIMIT ? OFFSET ?
    `, [...params, pageSize, offset]);

    return res.status(200).json({
      message: "Activity logs fetched successfully",
      data: logs,
      pagination: {
        total,
        page: pageNumber,
        limit: pageSize,
        totalPages: Math.ceil(total / pageSize),
      },
    });
  } catch (err) {
    console.error("Error fetching logs:", err);
    return res.status(500).json({
      message: "Server Error",
      error: err instanceof Error ? err.message : "Unknown error",
    });
  }
}
