import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

interface Article {
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
  createdAt: Date;
  categoryName: string | null;
  categorySlug: string | null;
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
    const page = parseInt((req.query.page as string) || "1", 10);
    const limit = parseInt((req.query.limit as string) || "20", 10);
    const skip = (page - 1) * limit;

    if (!query || query.trim().length < 2) {
      return res.status(400).json({ message: "Please provide a valid search query" });
    }

    const searchTerm = query.trim();

    // ✅ 1. Count total matching articles
    const total = await prisma.article.count({
      where: {
        status: "published",
        OR: [
          { title: { contains: searchTerm, mode: "insensitive" } },
          { summary: { contains: searchTerm, mode: "insensitive" } },
          { content: { contains: searchTerm, mode: "insensitive" } },
        ],
      },
    });

    // ✅ 2. Fetch matching articles
    const articlesRaw = await prisma.article.findMany({
      where: {
        status: "published",
        OR: [
          { title: { contains: searchTerm, mode: "insensitive" } },
          { summary: { contains: searchTerm, mode: "insensitive" } },
          { content: { contains: searchTerm, mode: "insensitive" } },
        ],
      },
      include: {
        category: {
          select: {
            name: true,
            slug: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
    });

    // ✅ 3. Map to API response shape
    const articles: Article[] = articlesRaw.map((a) => ({
      id: a.id,
      title: a.title,
      slug: a.slug,
      summary: a.summary,
      imageUrl: a.imageUrl,
      videoUrl: a.videoUrl,
      type: a.type,
      status: a.status,
      categoryId: a.categoryId,
      shareNo: a.shareNo !== null ? a.shareNo.toString() : "",
      viewNo: a.viewNo !== null ? a.viewNo.toString() : "",
      createdAt: a.createdAt,
      categoryName: a.category?.name ?? null,
      categorySlug: a.category?.slug ?? null,
    }));

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
    return res.status(500).json({
      message: "Server error",
      error: err instanceof Error ? err.message : "Unknown error",
    });
  }
}
