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
  error?: string;
  meta?: {
    total: number;
    page: number;
    limit: number;
  };
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
        role,
        page = "1",
        limit = "20",
      } = req.query as Record<string, string>;
  
      const pageNumber = Math.max(parseInt(page), 1);
      const pageSize = Math.max(parseInt(limit), 1);
      const skip = (pageNumber - 1) * pageSize;
  
      // ✅ Correct filters
      const where: any = {};
  
      if (slug) where.slug = slug;
      if (role) where.role = role;
  
      // ✅ FIXED search fields
      if (search) {
        where.OR = [
          { name: { contains: search, mode: "insensitive" } },
          { title: { contains: search, mode: "insensitive" } },
          { insight: { contains: search, mode: "insensitive" } },
        ];
      }
  
      const [members, total] = await Promise.all([
        prisma.member.findMany({
          where,
          orderBy: { createdAt: "desc" },
          skip,
          take: pageSize,
        }),
        prisma.member.count({ where }),
      ]);
  
      return res.status(200).json({
        message: "Members fetched successfully",
        data: members,
        meta: {
          total,
          page: pageNumber,
          limit: pageSize,
        },
      });
  
    } catch (err) {
      console.error("Error fetching members:", err);
  
      return res.status(500).json({
        message: "Server Error",
        error: err instanceof Error ? err.message : "Unknown error",
      });
    }
  }
  

  // -----------------------------
  // CREATE Member
  // -----------------------------
  if (req.method === "POST") {
    const { isAdmin: adminCheck, userId: adminId } = await isAdmin(req);
    if (!adminCheck || !adminId) {
      return res.status(403).json({ message: "Unauthorized: Admin access required" });
    }

    const { title, insight, role, name, imageUrl,  } = req.body as any;

    if (!title || !name) {
      return res.status(400).json({ message: "Title and Memebr Name are required" });
    }

    try {
      let slug = slugify(title, { lower: true, strict: true });

      // Check for duplicate slug
      const existing = await prisma.member.findFirst({ where: { slug } });
      if (existing) slug = `${slug}-${Date.now()}`;

      const member = await prisma.member.create({
        data: {
          title,
          name,
          slug,
          insight: insight ?? null,
          role,
          imageUrl: imageUrl ?? null,
          createdAt: now,
        },
      });

      await logActivity({
        req,
        action: "CREATE_MEMBER",
        type: "admin",
        id: adminId,
        description: `A new member has been created with title: ${title}`,
      });

      return res.status(201).json({ message: "Member created successfully", id: member.id });
    } catch (err) {
      console.error("Error creating member:", err);
      return res.status(500).json({
        message: "Error creating member",
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

    const { id, title, name, role, insight, imageUrl } =
      req.body as any;
      const memberId = Number(id);

    if (!memberId || !title) {
      return res.status(400).json({ message: "Missing required fields (id, title)" });
    }
    try {
      let slug = slugify(title, { lower: true, strict: true });

      const existingSlug = await prisma.member.findFirst({
        where: { slug, NOT: { id: memberId } },
      });
      if (existingSlug) slug = `${slug}-${Date.now()}`;

      await prisma.member.update({
        where: { id: memberId },
        data: {
          title,
          name,
          slug,
          insight: insight ?? null,
          role,
          imageUrl: imageUrl ?? null,
        },
      });

      await logActivity({
        req,
        action: "UPDATE_MEMBER",
        type: "admin",
        id: adminId,
        description: `An member with the title: ${title} has been updated`,
      });

      return res.status(200).json({ message: "Member updated successfully" });
    } catch (err) {
      console.error("Error updating member:", err);
      return res.status(500).json({
        message: "Error updating member",
        error: err instanceof Error ? err.message : "Unknown error",
      });
    }
  }

  // -----------------------------
  // PUBLISH / STATUS Change
  // -----------------------------
  if (req.method === "PATCH") {
    const { isAdmin: adminCheck, userId: adminId } = await isAdmin(req);
    if (!adminCheck || !adminId) {
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

  if (req.method === "DELETE") {
    const { isAdmin: adminCheck, userId: adminId } = await isAdmin(req);
    if (!adminCheck || !adminId) {
      return res.status(403).json({ message: "Unauthorized: Admin access required" });
    }

    const { id } = req.body as any;
    if (!id) return res.status(400).json({ message: "Member ID is required" });
    const memberId = Number(id);
    try {
      const member = await prisma.member.delete({
        where: { id: memberId },
      });

      await logActivity({
        req,
        action: "DELETE_MEMBER",
        type: "admin",
        id: adminId,
        description: `A member with id: ${id} has been deleted`,
      });

      return res.status(200).json({ message: `Member deleted successfully`, userId: id });
    } catch (err: any) {
      if (err.code === "P2025") return res.status(404).json({ message: "Member not found" });
      return res.status(500).json({
        message: "Error updating member",
        error: err instanceof Error ? err.message : "Unknown error",
      });
    }
  }

  return res.status(405).json({ message: "Method Not Allowed" });
}
