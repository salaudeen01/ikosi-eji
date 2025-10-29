import jwt from "jsonwebtoken";
import type { NextApiRequest } from "next";

interface JwtPayload {
  id: number;
  role: string;
  email: string;
}

export function getAdminFromToken(req: NextApiRequest): { isAdmin: boolean; adminId?: number } {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return { isAdmin: false };
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;

    if (decoded.role !== "admin") {
      return { isAdmin: false };
    }

    return { isAdmin: true, adminId: decoded.id };
  } catch {
    return { isAdmin: false };
  }
}
