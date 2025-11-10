import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const { slug } = req.query as { slug?: string };
    if (!slug) {
      return res.status(400).json({ message: "Missing required slug" });
    }

    // 1️⃣ Extract userId from token or null
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
        // Invalid token → ignore
      }
    }

    // 2️⃣ Fetch article by slug
    const article = await prisma.article.findFirst({
      where: { slug, status: "published" },
      include: {
        category: true,
        admin: {
          select: { name: true, email: true },
        },
      },
    });

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    // 3️⃣ Check if this user/IP already viewed
    const existingView = await prisma.articleView.findFirst({
      where: {
        articleId: article.id,
        OR: [
          { userId: userId ?? undefined },
          { userId: null, userIp },
        ],
      },
    });

    // 4️⃣ If not viewed yet → insert + increment
    if (!existingView) {
      await prisma.articleView.create({
        data: { articleId: article.id, userId: userId ?? null, userIp },
      });

      // Increment viewNo
      await prisma.article.update({
        where: { id: article.id },
        data: { viewNo: { increment: 1 } },
      });

      article.viewNo = (Number(article.viewNo) + 1);
    }

    // 5️⃣ Fetch related articles (same category, exclude current)
    const related = await prisma.article.findMany({
      where: {
        categoryId: article.categoryId,
        id: { not: article.id },
        status: "published",
        category: { status: "active" },
      },
      include: { category: true },
      orderBy: { createdAt: "desc" },
      take: 2,
    });

    return res.status(200).json({
      message: "Article fetched successfully",
      data: { article, related },
    });
  } catch (err) {
    console.error("Error fetching article:", err);
    return res.status(500).json({
      message: "Server error",
      error: err instanceof Error ? err.message : "Unknown error",
    });
  }
}
