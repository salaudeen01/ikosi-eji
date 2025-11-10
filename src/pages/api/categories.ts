/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextApiRequest, NextApiResponse } from "next";
import slugify from "slugify";
import prisma from "@/lib/prisma";
import { logActivity } from "@/lib/logActivity";

interface ApiResponse {
  message: string;
  data?: any;
  id?: number;
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  const now = new Date();

  // -----------------------------
  // GET categories
  // -----------------------------
  if (req.method === "GET") {
    try {
      const { slug, search } = req.query as { slug?: string; search?: string };

      const categories = await prisma.category.findMany({
        where: {
          status: "active",
          slug: slug ?? undefined,
          OR: search
            ? [
                { name: { contains: search, mode: "insensitive" } },
                { description: { contains: search, mode: "insensitive" } },
              ]
            : undefined,
        },
        orderBy: { id: "asc" },
      });

      return res.status(200).json({
        data: categories,
        message: "Categories fetched successfully",
      });
    } catch (err) {
      console.error("Error fetching categories:", err);
      return res.status(500).json({
        message: "Server Error",
        error: err instanceof Error ? err.message : "Unknown error",
      });
    }
  }

  // -----------------------------
  // CREATE category
  // -----------------------------
  if (req.method === "POST") {
    const { name, description, imageUrl } = req.body as {
      name?: string;
      description?: string;
      imageUrl?: string | null;
    };

    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    try {
      let slug = slugify(name, { lower: true, strict: true });

      // ✅ Check duplicate slug
      const existingSlug = await prisma.category.findFirst({
        where: { slug },
        select: { id: true },
      });
      if (existingSlug) {
        slug = `${slug}-${Date.now()}`;
      }

      const category = await prisma.category.create({
        data: {
          name,
          description: description ?? null,
          imageUrl: imageUrl ?? null,
          slug,
          createdAt: now,
        },
      });

      await logActivity({
        req,
        action: "CREATE_CATEGORY",
        type: "admin",
        description: `A new category with name: ${name} has been created`,
      });

      return res.status(201).json({
        message: "Category created successfully",
        id: category.id,
      });
    } catch (err) {
      return res.status(500).json({
        message: "Error creating category",
        error: err instanceof Error ? err.message : "Unknown error",
      });
    }
  }

  // -----------------------------
  // ARCHIVE category
  // -----------------------------
  if (req.method === "PATCH") {
    const { id } = req.body as { id?: number };

    if (!id) {
      return res.status(400).json({ message: "Category ID is required" });
    }

    try {
      const category = await prisma.category.update({
        where: { id },
        data: { status: "archived" },
      });

      await logActivity({
        req,
        action: "DELETE_CATEGORY",
        type: "admin",
        description: `Category with id ${id} has been archived`,
      });

      return res.status(200).json({
        message: "Category deleted successfully",
        id: category.id,
      });
    } catch (err: any) {
      if (err.code === "P2025") {
        // Prisma error if record not found
        return res.status(404).json({ message: "Category not found" });
      }
      return res.status(500).json({
        message: "Error deleting category",
        error: err instanceof Error ? err.message : "Unknown error",
      });
    }
  }

  // -----------------------------
  // UPDATE category
  // -----------------------------
  if (req.method === "PUT") {
    const { id, name, description, imageUrl } = req.body as {
      id?: number;
      name?: string;
      description?: string;
      imageUrl?: string | null;
    };

    if (!id || !name) {
      return res.status(400).json({ message: "Missing required fields (id, name)" });
    }

    try {
      let slug = slugify(name, { lower: true, strict: true });

      const existingSlug = await prisma.category.findFirst({
        where: { slug, NOT: { id } }, // exclude current record
        select: { id: true },
      });

      if (existingSlug) {
        slug = `${slug}-${Date.now()}`;
      }

      await prisma.category.update({
        where: { id },
        data: {
          name,
          description: description ?? null,
          imageUrl: imageUrl ?? null,
          slug,
        },
      });

      await logActivity({
        req,
        action: "UPDATE_CATEGORY",
        type: "admin",
        description: `Category with name: ${name} was updated`,
      });

      return res.status(200).json({
        message: "Category updated successfully",
      });
    } catch (err: any) {
      if (err.code === "P2025") {
        return res.status(404).json({ message: "Category not found" });
      }
      return res.status(500).json({
        message: "Error updating category",
        error: err instanceof Error ? err.message : "Unknown error",
      });
    }
  }

  return res.status(405).json({ message: "Method Not Allowed" });
}
