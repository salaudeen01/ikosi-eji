import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { logActivity } from "@/lib/logActivity";
import { verifyToken } from "@/lib/verifyToken";

interface FormattedArticle {
  id: number;
  title: string;
  slug: string;
  summary: string | null;
  imageUrl: string | null;
  createdAt: Date;
  categoryName: string | null;
  categorySlug: string | null;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const user = verifyToken(req);
    const userId = user.id;

    if (req.method === "GET") {
      const savedArticles = await prisma.savedArticle.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
        include: {
          article: {
            select: {
              id: true,
              title: true,
              slug: true,
              summary: true,
              imageUrl: true,
              createdAt: true,
              category: { select: { name: true, slug: true } },
            },
          },
        },
      });

      // ✅ Cast element inside map to inferred type
      const formattedArticles: FormattedArticle[] = savedArticles.map(
        (sa) => {
          const article = sa.article;
          return {
            id: article.id,
            title: article.title,
            slug: article.slug,
            summary: article.summary,
            imageUrl: article.imageUrl,
            createdAt: article.createdAt,
            categoryName: article.category?.name ?? null,
            categorySlug: article.category?.slug ?? null,
          };
        }
      );

      return res.status(200).json({
        message: "Saved articles fetched successfully",
        savedArticles: formattedArticles,
      });
    }

    if (req.method === "POST") {
      const { articleId } = req.body;
      if (!articleId) return res.status(400).json({ message: "Missing articleId" });

      const existing = await prisma.savedArticle.findFirst({
        where: { userId, articleId },
      });

      if (!existing) {
        await prisma.savedArticle.create({ data: { userId, articleId } });

        await logActivity({
          req,
          action: "SAVE_ARTICLE",
          type: "user",
          description: `User with email ${user.email} saved article with ID ${articleId}`,
        });
      }

      return res.status(201).json({ message: "Article saved successfully" });
    }

    if (req.method === "DELETE") {
      const { articleId } = req.body;
      if (!articleId) return res.status(400).json({ message: "Missing articleId" });

      await prisma.savedArticle.deleteMany({ where: { userId, articleId } });

      await logActivity({
        req,
        action: "REMOVE_SAVED_ARTICLE",
        type: "user",
        description: `User with email ${user.email} removed saved article with ID ${articleId}`,
      });

      return res.status(200).json({ message: "Article removed from saved list" });
    }

    return res.status(405).json({ message: "Method Not Allowed" });
  } catch (error) {
    console.error("Error managing saved articles:", error);
    return res.status(500).json({
      message: "Server error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
