import type { NextApiRequest, NextApiResponse } from "next";
import { CountResult } from "../../../../type";
import { db } from "@/lib/db";
import { RowDataPacket } from "mysql2";

// --- Response shape ---
interface Article extends RowDataPacket {
    id: number;
    title: string;
    slug: string;
    summary: string | null;
    imageUrl: string | null;
    videoUrl: string | null;
    type: string | null;
    status: string;
    categoryId: number;
    shareNo: string;
    viewNo: string;
    createdAt: string;
    categoryName: string;
    adminName: string;
  }

interface SearchResponse {
  message: string;
  data: Article[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SearchResponse | { message: string; error?: string }>
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const { query } = req.query as { query?: string };
    const page = parseInt((req.query.page as string) || "1", 20);
    const limit = parseInt((req.query.limit as string) || "20", 20);
    const offset = (page - 1) * limit;

    if (!query || query.trim().length < 2) {
      return res.status(400).json({ message: "Please provide a valid search query" });
    }

    const searchTerm = `%${query}%`;

    // ✅ 1. Count total matching articles
    const [countRows] = await db.query<CountResult[]>(
      `
      SELECT COUNT(*) AS total
      FROM articles
      WHERE status = 'published'
        AND (title LIKE ? OR summary LIKE ? OR content LIKE ?)
      `,
      [searchTerm, searchTerm, searchTerm]
    );

    const total = countRows[0]?.total ?? 0;

    // ✅ 2. Fetch matching articles
    const [articles] = await db.query<Article[]>(
      // `
      // SELECT 
      //   id, title, slug, summary, imageUrl, createdAt, categoryId
      // FROM articles
      // WHERE status = 'published'
      //   AND (title LIKE ? OR summary LIKE ? OR content LIKE ?)
      // ORDER BY createdAt DESC
      // LIMIT ? OFFSET ?
      // `,
      ` SELECT 
        a.id,
        a.title,
        a.slug,
        a.summary,
        a.imageUrl,
        a.createdAt,
        a.categoryId,
        c.name AS categoryName,
        c.slug AS categorySlug
      FROM articles a
      LEFT JOIN categories c ON a.categoryId = c.id
      WHERE a.status = 'published'
        AND (a.title LIKE ? OR a.summary LIKE ? OR a.content LIKE ?)
      ORDER BY a.createdAt DESC
      LIMIT ? OFFSET ?
      `,
      [searchTerm, searchTerm, searchTerm, limit, offset]
    );

    // ✅ 3. Response
    return res.status(200).json({
      message: "Search results fetched successfully",
      data: articles,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    console.error("Error searching articles:", err);
    const errorMessage =
      err instanceof Error ? err.message : "Unknown error occurred";
    return res.status(500).json({
      message: "Server error",
      error: errorMessage,
    });
  }
}
