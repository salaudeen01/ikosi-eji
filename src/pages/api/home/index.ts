import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

// --- Strict types ---
interface ArticleSummary {
  id: number;
  title: string;
  slug: string;
  imageUrl: string | null;
  summary: string | null;
  createdAt: Date;
}

interface CategoryWithArticles {
  id: number;
  name: string;
  slug: string;
  imageUrl: string | null;
  articles: ArticleSummary[];
}

interface HomeDataResponse {
  message: string;
  categories: CategoryWithArticles[];
  breakingNews: (ArticleSummary & { category: { name: string; slug: string } })[];
  banners: (ArticleSummary & { category: { name: string; slug: string } })[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<HomeDataResponse | { message: string; error?: string }>
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    // 1️⃣ Get all active categories
    const categories = await prisma.category.findMany({
      where: { status: "active" },
      orderBy: { createdAt: "asc" },
      select: { id: true, name: true, slug: true, imageUrl: true },
    });

    // 2️⃣ Fetch 3 latest published articles per category
    const categoriesWithArticles: (CategoryWithArticles | null)[] = await Promise.all(
      categories.map(async (cat: { id: number; name: string; slug: string; imageUrl: string | null }) => {
        const articles: ArticleSummary[] = await prisma.article.findMany({
          where: { categoryId: cat.id, status: "published" },
          orderBy: { createdAt: "desc" },
          take: 3,
          select: {
            id: true,
            title: true,
            slug: true,
            imageUrl: true,
            summary: true,
            createdAt: true,
          },
        });

        if (articles.length === 0) return null;
        return { ...cat, articles };
      })
    );

    // 3️⃣ Filter out null categories safely
    const filteredCategories: CategoryWithArticles[] = categoriesWithArticles.filter(
      (cat): cat is CategoryWithArticles => cat !== null
    );

    // 4️⃣ Fetch breaking news (with category details)
    const breakingNews = await prisma.article.findMany({
      where: {
        isBreaking: true,
        status: "published",
        category: { status: "active" },
      },
      orderBy: { createdAt: "desc" },
      take: 5,
      include: {
        category: { select: { name: true, slug: true } },
      },
    });

    // 5️⃣ Fetch banner articles (with category details)
    const banners = await prisma.article.findMany({
      where: {
        status: "published",
        imageUrl: { not: null },
        category: { status: "active" },
      },
      orderBy: { createdAt: "desc" },
      take: 4,
      include: { category: { select: { name: true, slug: true } } },
    });

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
