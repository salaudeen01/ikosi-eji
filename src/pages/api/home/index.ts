import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/db";
import { ClientArticle, ClientCategory } from "../../../../type";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    // 1️⃣ Get all active categories
    const [categories] = await db.query<ClientCategory[]>(
      `SELECT id, name, slug, imageUrl 
       FROM categories 
       WHERE status = 'active' 
       ORDER BY createdAt ASC`
    );

    // 2️⃣ Fetch 3 latest published articles per category
    const categoriesWithArticles = await Promise.all(
      categories.map(async (cat) => {
        const [articles] = await db.query<ClientArticle[]>(
          `SELECT id, title, slug, imageUrl, summary, createdAt 
           FROM articles 
           WHERE categoryId = ? AND status = 'published' 
           ORDER BY createdAt DESC 
           LIMIT 3`,
          [cat.id]
        );

        // ❌ If no articles, skip this category
        if (articles.length === 0) return null;

        return { ...cat, articles };
      })
    );

    // ✅ Filter out empty/null categories
    const filteredCategories = categoriesWithArticles.filter(
      (cat): cat is ClientCategory & { articles: ClientArticle[] } => cat !== null
    );

    // 3️⃣ Fetch breaking news (join to get category name + slug)
    const [breakingNews] = await db.query<ClientArticle[]>(
      `SELECT 
         a.id, a.title, a.slug, a.imageUrl, a.createdAt,
         c.name AS categoryName, c.slug AS categorySlug
       FROM articles a
       LEFT JOIN categories c ON a.categoryId = c.id
       WHERE a.isBreaking = 1 AND a.status = 'published' AND c.status = 'active'
       ORDER BY a.createdAt DESC
       LIMIT 5`
    );

    // 4️⃣ Fetch 4 banner categories (join to get category details)
    const [banners] = await db.query<ClientArticle[]>(
      `SELECT 
         a.id, a.title, a.slug, a.imageUrl, a.createdAt, a.summary,
         c.name AS categoryName, c.slug AS categorySlug
       FROM articles a
       LEFT JOIN categories c ON a.categoryId = c.id
       WHERE a.status = 'published' AND c.status = 'active' AND a.imageUrl IS NOT NULL
       ORDER BY a.createdAt DESC
       LIMIT 4`
    );

    // ✅ Final response
    return res.status(200).json({
      message: "Home data fetched successfully",
      categories: filteredCategories,
      breakingNews,
      banners,
    });
  } catch (err) {
    console.error("Error fetching home data:", err);
    return res.status(500).json({
      message: "Server error",
      error: err instanceof Error ? err.message : "Unknown error",
    });
  }
}

