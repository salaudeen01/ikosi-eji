import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/db";
import jwt from "jsonwebtoken";
import { RowDataPacket } from "mysql2";

interface Article extends RowDataPacket {
  id: number;
  title: string;
  slug: string;
  summary: string | null;
  imageUrl: string | null;
  videoUrl: string | null;
  content: string | null;
  type: string | null;
  status: string;
  categoryId: number;
  shareNo: string;
  viewNo: string;
  createdAt: string;
  categoryName: string;
  adminName: string;
}

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const { slug } = req.query as { slug?: string };
    if (!slug) {
      return res.status(400).json({ message: "Missing required slug" });
    }

    // 1️⃣ Extract user or IP
    let userId: number | null = null;
    const userIp: string | null =
      (req.headers["x-forwarded-for"] as string)?.split(",")[0] ||
      req.socket.remoteAddress ||
      null;

    const authHeader = req.headers.authorization;
    if (authHeader?.startsWith("Bearer ")) {
      const token = authHeader.split(" ")[1];
      try {
        const decoded = jwt.verify(token, JWT_SECRET) as { id?: number };
        if (decoded?.id) userId = decoded.id;
      } catch {
        // Invalid token → ignore (treat as guest)
      }
    }

    // 2️⃣ Fetch the article
    const [articleRows] = await db.query<Article[]>(
      `
      SELECT 
        a.*,
        c.name AS categoryName,
        u.name AS adminName,
        u.email AS adminEmail
      FROM articles a
      LEFT JOIN categories c ON a.categoryId = c.id
      LEFT JOIN admin u ON a.adminId = u.id
      WHERE a.slug = ? AND a.status = 'published'
      LIMIT 1
      `,
      [slug]
    );

    const article = articleRows[0];
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    // 3️⃣ Check if this user/IP already viewed
    const [existingViews] = await db.query<RowDataPacket[]>(
      `
      SELECT id 
      FROM article_views 
      WHERE articleId = ? 
        AND (
          (userId IS NOT NULL AND userId = ?) OR 
          (userId IS NULL AND userIp = ?)
        )
      `,
      [article.id, userId, userIp]
    );

    // 4️⃣ If not viewed yet → insert + increment
    if (existingViews.length === 0) {
      await db.query(
        `
        INSERT INTO article_views (articleId, userId, userIp)
        VALUES (?, ?, ?)
        `,
        [article.id, userId, userIp]
      );

      await db.query(`UPDATE articles SET viewNo = viewNo + 1 WHERE id = ?`, [article.id]);
      article.viewNo = String(Number(article.viewNo) + 1);
    }

    const [relatedRows] = await db.query<Article[]>(
      `
      SELECT 
        a.id,
        a.title,
        a.slug,
        a.summary,
        a.imageUrl,
        a.createdAt,
        c.name AS categoryName,
        c.slug AS categorySlug
      FROM articles a
      JOIN categories c ON a.categoryId = c.id
      WHERE 
        a.categoryId = ? 
        AND a.id != ? 
        AND a.status = 'published'
        AND c.status = 'active'
      ORDER BY a.createdAt DESC
      LIMIT 2
      `,
      [article.categoryId, article.id]
    );
    

    // ✅ 6️⃣ Send response
    return res.status(200).json({
      message: "Article fetched successfully",
      data: {
        article,
        related: relatedRows,
      },
    });
  } catch (err) {
    console.error("Error fetching article:", err);
    return res.status(500).json({
      message: "Server error",
      error: err instanceof Error ? err.message : "Unknown error",
    });
  }
}
