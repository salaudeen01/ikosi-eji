import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/db";
import { ClientCategory } from "../../../../type";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const limit = parseInt((req.query.limit as string) || "5", 10);

    const [rows] = await db.query<ClientCategory[]>(
      `SELECT id, name, slug 
       FROM categories 
       WHERE status = 'active'
       ORDER BY createdAt DESC
       LIMIT ?`,
      [limit]
    );

    return res.status(200).json({
      message: "Categories fetched successfully",
      data: rows,
    });
  } catch (err) {
    console.error("Error fetching categories:", err);
    return res.status(500).json({
      message: "Server error",
      error: err instanceof Error ? err.message : "Unknown error",
    });
  }
}
