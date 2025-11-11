import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

// --- Define strict response shape ---
interface ActivityLogRow {
  id: number;
  action: string;
  description: string | null;
  ipAddress: string | null;
  userAgent: string | null;
  createdAt: Date;
  userName: string | null;
  userEmail: string | null;
  adminName: string | null;
  adminEmail: string | null;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Reject unsupported methods
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const { page = "1", limit = "10", userId, adminId, action, search } = req.query;

    const pageNumber = Math.max(parseInt(page as string, 10), 1);
    const pageSize = Math.max(parseInt(limit as string, 10), 1);
    const skip = (pageNumber - 1) * pageSize;

    // ✅ Safely infer where input type from Prisma client
    type FindManyArgs = NonNullable<Parameters<typeof prisma.activityLog.findMany>[0]>;
    type ActivityLogWhereInput = NonNullable<FindManyArgs["where"]>;

    const filters: ActivityLogWhereInput = {};

    if (userId) filters.userId = Number(userId);
    if (adminId) filters.adminId = Number(adminId);
    if (action) filters.action = { contains: action as string };

    if (search) {
      const searchStr = search as string;
      filters.OR = [
        { action: { contains: searchStr } },
        { description: { contains: searchStr } },
        { user: { names: { contains: searchStr } } },
        { user: { email: { contains: searchStr } } },
        { admin: { name: { contains: searchStr } } },
        { admin: { email: { contains: searchStr } } },
      ];
    }

    // 2️⃣ Count total records
    const total = await prisma.activityLog.count({ where: filters });

    // 3️⃣ Fetch paginated logs
    const logsRaw = await prisma.activityLog.findMany({
      where: filters,
      skip,
      take: pageSize,
      orderBy: { createdAt: "desc" },
      include: {
        user: { select: { names: true, email: true } },
        admin: { select: { name: true, email: true } },
      },
    });

    // 4️⃣ Map to response shape (fully typed)
    const logs: ActivityLogRow[] = logsRaw?.map((log) => ({
      id: log.id,
      action: log.action,
      description: log.description ?? null,
      ipAddress: log.ipAddress ?? null,
      userAgent: log.userAgent ?? null,
      createdAt: log.createdAt,
      userName: log.user?.names ?? null,
      userEmail: log.user?.email ?? null,
      adminName: log.admin?.name ?? null,
      adminEmail: log.admin?.email ?? null,
    }));

    // 5️⃣ Send response
    return res.status(200).json({
      message: "Activity logs fetched successfully",
      data: logs,
      pagination: {
        total,
        page: pageNumber,
        limit: pageSize,
        totalPages: Math.ceil(total / pageSize),
      },
    });
  } catch (err) {
    console.error("Error fetching logs:", err);
    return res.status(500).json({
      message: "Server Error",
      error: err instanceof Error ? err.message : "Unknown error",
    });
  }
}
