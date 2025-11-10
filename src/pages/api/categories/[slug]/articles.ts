import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

// --- Define types specific for this API ---
interface ClientArticleResponse {
  id: number;
  title: string;
  slug: string;
  summary: string | null;
  imageUrl: string | null;
  createdAt: Date;
}

interface CategoryArticlesResponse {
  message: string;
  category: {
    id: number;
    name: string;
    slug: string;
    imageUrl: string | null;
    description: string | null;
  };
  articles: ClientArticleResponse[];
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
    const page = Math.max(parseInt((req.query.page as string) || "1", 10), 1);
    const limit = Math.max(parseInt((req.query.limit as string) || "10", 10), 1);
    const offset = (page - 1) * limit;

    if (!slug) {
      return res.status(400).json({ message: "Missing category slug" });
    }

    // 1️⃣ Fetch category details
    const category = await prisma.category.findFirst({
      where: { slug, status: "active" },
      select: {
        id: true,
        name: true,
        slug: true,
        imageUrl: true,
        description: true,
      },
    });

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // 2️⃣ Count total published articles in this category
    const total = await prisma.article.count({
      where: { categoryId: category.id, status: "published" },
    });

    // 3️⃣ Fetch paginated articles
    const articles: ClientArticleResponse[] = await prisma.article.findMany({
      where: { categoryId: category.id, status: "published" },
      orderBy: { createdAt: "desc" },
      skip: offset,
      take: limit,
      select: {
        id: true,
        title: true,
        slug: true,
        summary: true,
        imageUrl: true,
        createdAt: true,
      },
    });

    // 4️⃣ Prepare and send response
    const response: CategoryArticlesResponse = {
      message: "Category articles fetched successfully",
      category: {
        id: category.id,
        name: category.name,
        slug: category.slug,
        imageUrl: category.imageUrl,
        description: category.description,
      },
      articles,
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
    return res.status(500).json({
      message: "Server error",
      error: err instanceof Error ? err.message : "Unknown error",
    });
  }
}
