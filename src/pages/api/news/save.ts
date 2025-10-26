/* eslint-disable @typescript-eslint/no-unused-vars */
import { db } from "@/lib/db";
import { JwtPayload } from "jsonwebtoken";
import type { NextApiRequest, NextApiResponse } from "next";
import jwt from 'jsonwebtoken';

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

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const user = verifyToken(req); // ✅ Ensure valid auth token
    const userId = user.id;

    if (req.method === "GET") {
      // ✅ Fetch saved articles for logged-in user
      const [savedArticles] = await db.query(
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
        FROM saved_articles s
        JOIN articles a ON s.articleId = a.id
        JOIN categories c ON a.categoryId = c.id
        WHERE s.userId = ?
        ORDER BY s.createdAt DESC
        `,
        [userId]
      );

      return res.status(200).json({
        message: "Saved articles fetched successfully",
        savedArticles,
      });
    }

    if (req.method === "POST") {
      // ✅ Save new article
      const { articleId } = req.body;
      if (!articleId) return res.status(400).json({ message: "Missing articleId" });

      await db.query(
        `INSERT IGNORE INTO saved_articles (userId, articleId) VALUES (?, ?)`,
        [userId, articleId]
      );

      return res.status(201).json({ message: "Article saved successfully" });
    }

    if (req.method === "DELETE") {
      // ✅ Remove saved article
      const { articleId } = req.body;
      if (!articleId) return res.status(400).json({ message: "Missing articleId" });

      await db.query(
        `DELETE FROM saved_articles WHERE userId = ? AND articleId = ?`,
        [userId, articleId]
      );

      return res.status(200).json({ message: "Article removed from saved list" });
    }

    return res.status(405).json({ message: "Method Not Allowed" });
  } catch (error) {
    console.error("Error fetching saved articles:", error);
    return res.status(500).json({
      message: "Server error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
