import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../lib/db";
import jwt from "jsonwebtoken";
import { RowDataPacket } from "mysql2";

// ✅ DB Model
interface Article {
  id: number;
  title: string;
  categoryId: number;
  adminId: number;
  summary: string | null;
  content: string | null;
  imageUrl: string | null;
  videoUrl: string | null;
  slug: string | null;
  status: string;
  shareNo: string;
  viewNo: string;
  createdAt: string;
}

interface ApiResponse {
  message: string;
  data?: Article[];
  id?: number;
  userId?: number;
  pagination?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  error?: string;
}

interface User extends RowDataPacket {
  id: number;
  email: string;
  password: string;
  name: string;
  role: string;
  status: "active" | "archived" | string;
}

interface JwtPayload {
  id: number;
  role: string;
  email: string;
}

// ✅ Check if token is valid and user is admin
async function isAdmin(
  req: NextApiRequest
): Promise<{ isAdmin: boolean; userId?: number, adminType?: string }> {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return { isAdmin: false };
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;

    // if (decoded.role !== "admin") {
    //   return { isAdmin: false };
    // }

    const [rows] = await db.query<User[]>(
      "SELECT id FROM admin WHERE id = ? AND status = ?",
      [decoded.id, "active"]
    );

    if (!rows.length) return { isAdmin: false };

    return { isAdmin: true, userId: decoded.id, adminType: decoded.role };
  } catch {
    return { isAdmin: false };
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
): Promise<void> {
 
  if (req.method === "GET") {
    try {
      const {
        slug,
        search,
        status,
        categoryId,
        adminId,
        startDate,
        endDate,
        page = "1",
        limit = "10",
      } = req.query as {
        slug?: string;
        search?: string;
        status?: string;
        categoryId?: string;
        adminId?: string;
        startDate?: string;
        endDate?: string;
        page?: string;
        limit?: string;
      };

      const pageNumber = Math.max(parseInt(page, 10), 1);
      const pageSize = Math.max(parseInt(limit, 10), 1);
      const offset = (pageNumber - 1) * pageSize;

      // ✅ Base query — now ensures category is active
      let query = `
        SELECT 
          a.id,
          a.title,
          a.slug,
          a.summary,
          a.imageUrl,
          a.videoUrl,
          a.content,
          a.type,
          a.status,
          a.categoryId,
          a.shareNo,
          a.viewNo,
          a.createdAt,
          c.name AS categoryName,
          u.name AS adminName,
          u.email AS adminEmail
        FROM articles a
        LEFT JOIN categories c ON a.categoryId = c.id
        LEFT JOIN admin u ON a.adminId = u.id
        WHERE 1=1
          AND (c.status = 'active' OR c.status IS NULL)
      `;

      const params: (string | number)[] = [];

      // ✅ Optional filters
      if (slug) {
        query += " AND a.slug = ?";
        params.push(slug);
      }

      if (status) {
        query += " AND a.status = ?";
        params.push(status);
      }

      if (categoryId) {
        query += " AND a.categoryId = ?";
        params.push(Number(categoryId));
      }

      if (adminId) {
        query += " AND a.adminId = ?";
        params.push(Number(adminId));
      }

      if (search) {
        query += " AND (a.title LIKE ? OR a.summary LIKE ?)";
        const searchTerm = `%${search}%`;
        params.push(searchTerm, searchTerm);
      }

      // ✅ Date filter
      if (startDate && endDate) {
        query += " AND DATE(a.createdAt) BETWEEN ? AND ?";
        params.push(startDate, endDate);
      } else if (startDate) {
        query += " AND DATE(a.createdAt) >= ?";
        params.push(startDate);
      } else if (endDate) {
        query += " AND DATE(a.createdAt) <= ?";
        params.push(endDate);
      }

      // ✅ Count query
      const countQuery = `
        SELECT COUNT(*) as total 
        FROM articles a
        LEFT JOIN categories c ON a.categoryId = c.id
        LEFT JOIN users u ON a.adminId = u.id
        WHERE 1=1
          AND (c.status = 'active' OR c.status IS NULL)
          ${query.split("WHERE 1=1")[1]}
      `;
      const [countRows] = await db.query(countQuery, params);
      const total = (countRows as { total: number }[])[0]?.total || 0;

      // ✅ Pagination + ordering
      query += " ORDER BY a.createdAt DESC LIMIT ? OFFSET ?";
      params.push(pageSize, offset);

      const [rows] = await db.query(query, params);
      const articles = rows as Article[];

      return res.status(200).json({
        message: "Articles fetched successfully",
        data: articles,
        pagination: {
          total,
          page: pageNumber,
          limit: pageSize,
          totalPages: Math.ceil(total / pageSize),
        },
      });
    } catch (err) {
      console.error("Error fetching articles:", err);
      return res.status(500).json({
        message: "Server Error",
        error: err instanceof Error ? err.message : "Unknown error",
      });
    }
  }

  if (req.method === "POST") {
    const { isAdmin: adminCheck, userId: adminId, adminType } = await isAdmin(req);

    console.log(adminCheck, adminId, adminType)

    // if (!adminCheck || !adminId) {
    //   return res
    //     .status(403)
    //     .json({ message: "Unauthorized: Admin access required" });
    // }

    const {
      title,
      summary,
      slug,
      imageUrl,
      categoryId,
      content,
      videoUrl,
    } = req.body as {
      title?: string;
      summary?: string;
      slug?: string;
      imageUrl?: string;
      categoryId?: number;
      content?: string;
      videoUrl?: string;
    };

    if (!title || !categoryId) {
      return res
        .status(400)
        .json({ message: "Title and Category ID are required" });
    }

    try {
      const now = new Date();

      const [result] = await db.query(
        "INSERT INTO articles (title, summary, imageUrl, slug, content, categoryId, videoUrl, adminId, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
          title,
          summary || null,
          imageUrl || null,
          slug || null,
          content || null,
          categoryId,
          videoUrl || null,
          adminId,
          now,
        ]
      );

      const insertResult = result as { insertId: number };

      return res.status(201).json({
        message: "Article created successfully",
        id: insertResult?.insertId,
      });
    } catch (err) {
      return res.status(500).json({
        message: "Error creating article",
        error: err instanceof Error ? err.message : "Unknown error",
      });
    }
  }

  if (req.method === "PATCH") {
    const { id } = req.body as { id?: number };

    if (!id) {
      return res.status(400).json({ message: "Article ID is required" });
    }

    try {
      const [result] = await db.query(
        "UPDATE articles SET status = ? WHERE id = ?",
        ["archived", id]
      );

      const updateResult = result as { affectedRows: number };

      if (updateResult.affectedRows === 0) {
        return res.status(404).json({ message: "Article not found" });
      }

      return res.status(200).json({
        message: "Article deleted successfully",
        userId: id,
      });
    } catch (err) {
      return res.status(500).json({
        message: "Error deleting article",
        error: err instanceof Error ? err.message : "Unknown error",
      });
    }
  }

  if (req.method === "PUT") {
    const { id, title, summary, slug, imageUrl } = req.body as {
      id?: number;
      title?: string;
      summary?: string;
      slug?: string;
      imageUrl?: string;
    };

    if (!id || !title) {
      return res.status(400).json({
        message: "Missing required fields (id, title)",
      });
    }

    try {
      await db.query(
        "UPDATE articles SET title = ?, summary = ?, slug = ?, imageUrl = ? WHERE id = ?",
        [title, summary || null, slug || null, imageUrl || null, id]
      );

      return res.status(200).json({
        message: "Article updated successfully",
      });
    } catch (err) {
      return res.status(500).json({
        message: "Error updating article",
        error: err instanceof Error ? err.message : "Unknown error",
      });
    }
  }

  res.status(405).json({ message: "Method Not Allowed" });
}
