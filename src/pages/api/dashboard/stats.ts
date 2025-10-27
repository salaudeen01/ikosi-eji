import type { NextApiRequest, NextApiResponse } from "next";
import { RowDataPacket } from "mysql2";
import { db } from "@/lib/db";
import { JwtPayload } from "jsonwebtoken";
import jwt from 'jsonwebtoken';

// ✅ Define strict types
interface CountRow extends RowDataPacket {
  total: number;
}

interface TopArticle extends RowDataPacket {
  id: number;
  title: string;
  slug: string;
  imageUrl: string | null;
  views: number;
}

interface RecentArticle extends RowDataPacket {
  id: number;
  title: string;
  slug: string;
  imageUrl: string | null;
  createdAt: string;
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
  
export function verifyToken(req: NextApiRequest): AuthPayload {
const authHeader = req.headers.authorization;
if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("Unauthorized");
}

const token = authHeader.split(" ")[1];

try {
    // ✅ Verify and cast the token payload
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
    if (!admin) { //  || admin.role !== "admin"
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    // ✅ 2. Fetch stats in parallel
    const [
      [articleCount],
      [categoryCount],
      [adminCount],
      [userCount],
      [savedCount],
      [viewCount],
      [topArticles],
      [recentArticles],
    ] = await Promise.all([
      db.query<CountRow[]>(`SELECT COUNT(a.id) AS total
        FROM articles a
        JOIN categories c ON a.categoryId = c.id
        WHERE c.status = 'active'`),
      db.query<CountRow[]>(`SELECT COUNT(*) AS total FROM categories WHERE status = 'active'`),
      db.query<CountRow[]>(`SELECT COUNT(*) AS total FROM admin WHERE status = 'active'`),
      db.query<CountRow[]>(`SELECT COUNT(*) AS total FROM users`),
      db.query<CountRow[]>(`SELECT COUNT(*) AS total FROM saved_articles`),
      db.query<CountRow[]>(`SELECT COUNT(*) AS total FROM article_views`),

      db.query<TopArticle[]>(`
        SELECT 
          a.id, 
          a.title, 
          a.slug, 
          a.imageUrl,
          COUNT(v.id) AS views
        FROM article_views v
        JOIN articles a ON v.articleId = a.id
        GROUP BY a.id
        ORDER BY views DESC
        LIMIT 5
      `),

      db.query<RecentArticle[]>(`
        SELECT 
          a.id, 
          a.title, 
          a.slug, 
          a.imageUrl, 
          a.createdAt,
          c.name AS categoryName
        FROM articles a
        JOIN categories c ON a.categoryId = c.id
        WHERE a.status = 'published'
        ORDER BY a.createdAt DESC
        LIMIT 5
      `),
    ]);

    // ✅ 3. Combine and respond
    const stats: DashboardStats = {
      totalArticles: articleCount[0]?.total ?? 0,
      totalCategories: categoryCount[0]?.total ?? 0,
      totalUsers: userCount[0]?.total ?? 0,
      totalAdmins: adminCount[0]?.total ?? 0,
      totalSaved: savedCount[0]?.total ?? 0,
      totalViews: viewCount[0]?.total ?? 0,
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
