/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextApiRequest, NextApiResponse } from "next";
import slugify from "slugify";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";
import { logActivity } from "@/lib/logActivity";

interface ApiResponse {
  message: string;
  data?: any;
  id?: number;
  userId?: number;
  stats?: { total: number; published: number; draft: number };
  pagination?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  error?: string;
}

interface JwtPayload {
  id: number;
  role: string;
  email: string;
}

// ---------------------------
// Check admin access
// ---------------------------
async function isAdmin(req: NextApiRequest) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) return { isAdmin: false };

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    if (!decoded.role) return { isAdmin: false };

    const admin = await prisma.admin.findFirst({
      where: { id: decoded.id, status: "active" },
    });

    if (!admin) return { isAdmin: false };
    return { isAdmin: true, userId: decoded.id, adminType: decoded.role };
  } catch {
    return { isAdmin: false };
  }
}

// ---------------------------
// API Handler
// ---------------------------
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  const now = new Date();

  // -----------------------------
  // GET Articles
  // -----------------------------
  if (req.method === "GET") {
    try {
      const {
        slug,
        search,
        status,
        categoryId,
        adminId,
        startDate,
        endDate,
        page = "1",
        limit = "10",
      } = req.query as Record<string, string>;
  
      const pageNumber = Math.max(parseInt(page), 1);
      const pageSize = Math.max(parseInt(limit), 1);
      const skip = (pageNumber - 1) * pageSize;
  
      // -------------------------------------------------------
      // ✅ Build dynamic Prisma filters SAFELY
      // -------------------------------------------------------
      const where: any = {
        category: {
          status: "active", // always filter active category
        },
      };
  
      if (slug) where.slug = slug;
      if (status) where.status = status;
      if (categoryId) where.categoryId = Number(categoryId);
      if (adminId) where.adminId = Number(adminId);
  
      // Search filter
      if (search) {
        where.OR = [
          { title: { contains: search, mode: "insensitive" } },
          { summary: { contains: search, mode: "insensitive" } },
        ];
      }
  
      // Date filter
      if (startDate || endDate) {
        where.createdAt = {};
  
        if (startDate) {
          const start = new Date(startDate);
          if (!isNaN(start.getTime())) where.createdAt.gte = start;
        }
  
        if (endDate) {
          const end = new Date(endDate);
          if (!isNaN(end.getTime())) where.createdAt.lte = end;
        }
      }
  
      // Debug log (optional)
      // console.log("WHERE FILTER:", JSON.stringify(where, null, 2));
  
      // -------------------------------------------------------
      // ✅ Query articles + total count
      // -------------------------------------------------------
      const [articles, total] = await Promise.all([
        prisma.article.findMany({
          where,
          include: {
            category: { select: { name: true } },
            admin: { select: { name: true, email: true } },
          },
          orderBy: { createdAt: "desc" },
          skip,
          take: pageSize,
        }),
  
        prisma.article.count({ where }),
      ]);
  
      // -------------------------------------------------------
      // ✅ Additional Stats
      // -------------------------------------------------------
      const stats = await prisma.article.aggregate({
        _count: { _all: true },
        _sum: { viewNo: true },
        where: { category: { status: "active" } },
      });
  
      return res.status(200).json({
        message: "Articles fetched successfully",
        data: articles,
        pagination: {
          total,
          page: pageNumber,
          limit: pageSize,
          totalPages: Math.ceil(total / pageSize),
        },
        stats: {
          total: stats._count._all,
          published: await prisma.article.count({ where: { status: "published" } }),
          draft: await prisma.article.count({ where: { status: "draft" } }),
        },
      });
  
    } catch (err) {
      console.error("Error fetching articles:", err);
      return res.status(500).json({
        message: "Server Error",
        error: err instanceof Error ? err.message : "Unknown error",
      });
    }
  }
  

  // -----------------------------
  // CREATE Article
  // -----------------------------
  if (req.method === "POST") {
    const { isAdmin: adminCheck, userId: adminId } = await isAdmin(req);
    if (!adminCheck || !adminId) {
      return res.status(403).json({ message: "Unauthorized: Admin access required" });
    }

    const { title, summary, type, isBreak, imageUrl, categoryId, content, videoUrl } =
      req.body as any;

    if (!title || !categoryId) {
      return res.status(400).json({ message: "Title and Category ID are required" });
    }

    try {
      let slug = slugify(title, { lower: true, strict: true });
      const isBreaking = isBreak === "1";

      // Check for duplicate slug
      const existing = await prisma.article.findFirst({ where: { slug } });
      if (existing) slug = `${slug}-${Date.now()}`;

      const article = await prisma.article.create({
        data: {
          title,
          summary: summary ?? null,
          slug,
          isBreaking,
          type: type ?? null,
          content: content ?? null,
          imageUrl: imageUrl ?? null,
          videoUrl: videoUrl ?? null,
          categoryId:Number(categoryId),
          adminId,
          createdAt: now,
        },
      });

      await logActivity({
        req,
        action: "CREATE_ARTICLE",
        type: "admin",
        id: adminId,
        description: `A new article has been created with title: ${title}`,
      });

      return res.status(201).json({ message: "Article created successfully", id: article.id });
    } catch (err) {
      console.error("Error creating article:", err);
      return res.status(500).json({
        message: "Error creating article",
        error: err instanceof Error ? err.message : "Unknown error",
      });
    }
  }

  // -----------------------------
  // UPDATE Article
  // -----------------------------
  if (req.method === "PUT") {
    const { isAdmin: adminCheck, userId: adminId } = await isAdmin(req);
    if (!adminCheck || !adminId) {
      return res.status(403).json({ message: "Unauthorized: Admin access required" });
    }

    const { id, title, summary, type, isBreak, imageUrl, categoryId, content, videoUrl } =
      req.body as any;

    if (!id || !title) {
      return res.status(400).json({ message: "Missing required fields (id, title)" });
    }

    try {
      let slug = slugify(title, { lower: true, strict: true });
      const isBreaking = isBreak === "1";

      const existingSlug = await prisma.article.findFirst({
        where: { slug, NOT: { id } },
      });
      if (existingSlug) slug = `${slug}-${Date.now()}`;

      await prisma.article.update({
        where: { id },
        data: {
          title,
          summary: summary ?? null,
          slug,
          isBreaking,
          type: type ?? null,
          content: content ?? null,
          imageUrl: imageUrl ?? null,
          videoUrl: videoUrl ?? null,
          categoryId: categoryId ?? undefined,
        },
      });

      await logActivity({
        req,
        action: "UPDATE_ARTICLE",
        type: "admin",
        id: adminId,
        description: `An article with the title: ${title} has been updated`,
      });

      return res.status(200).json({ message: "Article updated successfully" });
    } catch (err) {
      console.error("Error updating article:", err);
      return res.status(500).json({
        message: "Error updating article",
        error: err instanceof Error ? err.message : "Unknown error",
      });
    }
  }

  // -----------------------------
  // PUBLISH / STATUS Change
  // -----------------------------
  if (req.method === "PATCH") {
    const { isAdmin: adminCheck, userId: adminId, adminType } = await isAdmin(req);
    if (!adminCheck || !adminId || adminType === "editor") {
      return res.status(403).json({ message: "Unauthorized: Admin access required" });
    }

    const { id, status } = req.body as any;
    if (!id) return res.status(400).json({ message: "Article ID is required" });
    const articleId = Number(id);
    try {
      const article = await prisma.article.update({
        where: { id: articleId },
        data: { status },
      });

      await logActivity({
        req,
        action: "PUBLISH_ARTICLE",
        type: "admin",
        id: adminId,
        description: `An article with id: ${id} has been ${status}`,
      });

      return res.status(200).json({ message: `Article ${status} successfully`, userId: id });
    } catch (err: any) {
      if (err.code === "P2025") return res.status(404).json({ message: "Article not found" });
      return res.status(500).json({
        message: "Error updating article",
        error: err instanceof Error ? err.message : "Unknown error",
      });
    }
  }

  return res.status(405).json({ message: "Method Not Allowed" });
}
