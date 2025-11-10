import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import jwt, { JwtPayload } from "jsonwebtoken";

// ✅ Define strict types inside the component
interface TopArticle {
  id: number;
  title: string;
  slug: string;
  imageUrl: string | null;
  views: number;
}

interface RecentArticle {
  id: number;
  title: string;
  slug: string;
  imageUrl: string | null;
  createdAt: Date;
  categoryName: string;
}

interface DashboardStats {
  totalArticles: number;
  totalCategories: number;
  totalUsers: number;
  totalAdmins: number;
  totalSaved: number;
  totalViews: number;
  topArticles: TopArticle[];
  recentArticles: RecentArticle[];
}

const JWT_SECRET = process.env.JWT_SECRET!;

interface AuthPayload extends JwtPayload {
  id: number;
  email: string;
}

// ✅ Token verification
export function verifyToken(req: NextApiRequest): AuthPayload {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("Unauthorized");
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as AuthPayload;
    if (!decoded.id) throw new Error("Invalid token payload");
    return decoded;
  } catch (err) {
    throw new Error("Invalid or expired token");
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    // ✅ 1. Verify admin authentication
    const admin = verifyToken(req);
    if (!admin) {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    // ✅ 2. Fetch stats in parallel
    const [
      totalArticles,
      totalCategories,
      totalAdmins,
      totalUsers,
      totalSaved,
      totalViews,
      topArticlesRaw,
      recentArticlesRaw,
    ] = await Promise.all([
      prisma.article.count({ where: { category: { status: "active" } } }),
      prisma.category.count({ where: { status: "active" } }),
      prisma.admin.count({ where: { status: "active" } }),
      prisma.user.count(),
      prisma.savedArticle.count(),
      prisma.articleView.count(),
      // Top 5 articles by views
      prisma.article.findMany({
        orderBy: { articleViews: { _count: "desc" } }, // relation count
        take: 5,
        select: {
          id: true,
          title: true,
          slug: true,
          imageUrl: true,
          _count: { select: { articleViews: true } }, // count views from relation
        },
      }),
      // Recent 5 articles
      prisma.article.findMany({
        where: { status: "published" },
        orderBy: { createdAt: "desc" },
        take: 5,
        select: {
          id: true,
          title: true,
          slug: true,
          imageUrl: true,
          createdAt: true,
          category: { select: { name: true } },
        },
      }),
    ]);

    // Map topArticles to include `views` property
    const topArticles: TopArticle[] = topArticlesRaw.map((a) => ({
      id: a.id,
      title: a.title,
      slug: a.slug,
      imageUrl: a.imageUrl,
      views: a._count.articleViews ?? 0,
    }));

    // Map recentArticles to include categoryName
    const recentArticles: RecentArticle[] = recentArticlesRaw.map((a) => ({
      id: a.id,
      title: a.title,
      slug: a.slug,
      imageUrl: a.imageUrl,
      createdAt: a.createdAt,
      categoryName: a.category.name,
    }));

    const stats: DashboardStats = {
      totalArticles,
      totalCategories,
      totalUsers,
      totalAdmins,
      totalSaved,
      totalViews,
      topArticles,
      recentArticles,
    };

    return res.status(200).json({
      message: "Dashboard stats fetched successfully",
      stats,
    });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return res.status(500).json({
      message: "Server error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
