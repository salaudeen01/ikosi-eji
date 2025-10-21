import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/db";
import { ClientArticle, ClientCategory, CountResult } from "../../../../../type";



// --- Define the API response shape ---
interface CategoryArticlesResponse {
  message: string;
  category: {
    id: number;
    name: string;
    slug: string;
    imageUrl: string | null;
    description: string | null;
  };
  articles: ClientArticle[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CategoryArticlesResponse | { message: string; error?: string }>
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const { slug } = req.query as { slug?: string };
    const page = parseInt((req.query.page as string) || "1", 10);
    const limit = parseInt((req.query.limit as string) || "10", 10);
    const offset = (page - 1) * limit;

    if (!slug) {
      return res.status(400).json({ message: "Missing category slug" });
    }

    // ✅ 1. Fetch category details
    const [categoryRows] = await db.query<ClientCategory[]>(
      `
      SELECT id, name, slug, imageUrl, description 
      FROM categories 
      WHERE slug = ? AND status = 'active' 
      LIMIT 1
      `,
      [slug]
    );

    if (categoryRows.length === 0) {
      return res.status(404).json({ message: "Category not found" });
    }

    const category = categoryRows[0];

    // ✅ Query section
    const [countRows] = await db.query<CountResult[]>(
        `
        SELECT COUNT(*) AS total
        FROM articles
        WHERE categoryId = ? AND status = 'published'
        `,
        [category.id]
    );
    
    const total = countRows[0]?.total ?? 0;

    // ✅ 3. Fetch paginated articles
    const [articleRows] = await db.query<ClientArticle[]>(
      `
      SELECT id, title, slug, summary, imageUrl, createdAt 
      FROM articles 
      WHERE categoryId = ? AND status = 'published' 
      ORDER BY createdAt DESC 
      LIMIT ? OFFSET ?
      `,
      [category.id, limit, offset]
    );

    // ✅ 4. Return a fully typed response
    const response: CategoryArticlesResponse = {
      message: "Category articles fetched successfully",
      category: {
        id: category.id,
        name: category.name,
        slug: category.slug,
        imageUrl: category.imageUrl,
        description: category.description,
      },
      articles: articleRows,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };

    return res.status(200).json(response);
  } catch (err) {
    console.error("Error fetching category articles:", err);
    const errorMessage =
      err instanceof Error ? err.message : "Unknown error occurred";
    return res.status(500).json({
      message: "Server error",
      error: errorMessage,
    });
  }
}
