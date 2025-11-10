import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { logActivity } from "@/lib/logActivity";
import { verifyToken } from "@/lib/verifyToken";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const user = verifyToken(req); // Ensure valid auth token
    const userId = user.id;

    if (req.method === "GET") {
      // Fetch saved articles
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

      const formattedArticles = savedArticles.map((sa) => ({
        ...sa.article,
        categoryName: sa.article.category?.name ?? null,
        categorySlug: sa.article.category?.slug ?? null,
      }));

      return res.status(200).json({
        message: "Saved articles fetched successfully",
        savedArticles: formattedArticles,
      });
    }

    if (req.method === "POST") {
      const { articleId } = req.body;
      if (!articleId) return res.status(400).json({ message: "Missing articleId" });

      // Check if already saved
      const existing = await prisma.savedArticle.findFirst({
        where: { userId, articleId },
      });

      if (!existing) {
        await prisma.savedArticle.create({
          data: { userId, articleId },
        });

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

      await prisma.savedArticle.deleteMany({
        where: { userId, articleId },
      });

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
