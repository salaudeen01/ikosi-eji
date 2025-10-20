import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../lib/db";

// id	name	slug	imageUrl	description	status	createdAt	updatedAt	

interface Category {
  id: number;
  name: string;
  description: string | null;
  slug: string | null;
  status: string;
  createdAt: string;
}

interface ApiResponse {
  message: string;
  data?: Category[];
  id?: number;
  userId?: number;
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
): Promise<void> {
  if (req.method === "GET") {
    try {
      const { slug, search } = req.query as {
        slug?: string;
        search?: string;
      };

      let query = `SELECT * FROM categories WHERE status = 'active'`;
      const params: (string | number)[] = [];

      if (slug) {
        query += ` AND slug = ?`;
        params.push(slug);
      }

      if (search) {
        query += ` AND (name LIKE ? OR description LIKE ?)`;
        const searchTerm = `%${search}%`;
        params.push(searchTerm, searchTerm);
      }

      query += ` ORDER BY id ASC`;

      const [rows] = await db.query(query, params);
      const categories = rows as unknown as Category[];

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

  if (req.method === "POST") {
    const { name, description, slug, imageUrl } = req.body as {
      name?: string;
      description?: string;
      slug: string | null;
      imageUrl: string | null;
      createdAt: string;
    };
    const now = new Date();

    if (!name) {
      return res
        .status(400)
        .json({ message: "Name and Category are required" });
    }

    try {
      const [result] = await db.query(
        "INSERT INTO categories (name, description, imageUrl, slug, createdAt) VALUES (?, ?, ?, ?, ?)",
        [name, description || null, imageUrl, slug, now]
      );

      const insertResult = result as { insertId: number };

      return res.status(201).json({
        message: "Category created successfully",
        id: insertResult.insertId,
      });
    } catch (err) {
      return res.status(500).json({
        message: "Error creating category",
        error: err instanceof Error ? err.message : "Unknown error",
      });
    }
  }

  if (req.method === "PATCH") {
    const { id } = req.body as { id?: number };

    if (!id) {
      return res.status(400).json({ message: "Category ID is required" });
    }

    try {
      const [result] = await db.query(
        "UPDATE categories SET status = ? WHERE id = ?",
        ["archived", id]
      );

      const updateResult = result as { affectedRows: number };

      if (updateResult.affectedRows === 0) {
        return res.status(404).json({ message: "Category not found" });
      }

      return res.status(200).json({
        message: "Category deleted successfully",
        userId: id,
      });
    } catch (err) {
      return res.status(500).json({
        message: "Error deleting category",
        error: err instanceof Error ? err.message : "Unknown error",
      });
    }
  }

  if (req.method === "PUT") {
    const { id, name, description, slug, imageUrl } = req.body as {
      id?: number;
      desc?: string;
      name?: string;
      description?: string;
      slug: string | null;
      imageUrl: string | null;
    };

    if (!id || !name) {
      return res
        .status(400)
        .json({ message: "Missing required fields (id, name)" });
    }

    try {
      await db.query(
        "UPDATE categories SET name = ?, description = ?, slug = ?, imageUrl = ? WHERE id = ?",
        [name, description || null, slug || null, imageUrl || null, id]
      );

      return res.status(200).json({
        message: "Category updated successfully",
      });
    } catch (err) {
      return res.status(500).json({
        message: "Error updating category",
        error: err instanceof Error ? err.message : "Unknown error",
      });
    }
  }

  return res.status(405).json({ message: "Method Not Allowed" });
}
