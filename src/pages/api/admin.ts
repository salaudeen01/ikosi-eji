/* eslint-disable @typescript-eslint/no-unused-vars */
import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";
import { sendAdminWelcomeEmail } from "@/lib/mailer";
import { logActivity } from "@/lib/logActivity";

interface JwtPayload {
  id: number;
  role: string;
  email: string;
}

async function isAdmin(req: NextApiRequest) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) return { isAdmin: false };

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    if (decoded.role !== "admin") return { isAdmin: false };

    const admin = await prisma.admin.findUnique({
      where: { id: decoded.id },
      select: { id: true, role: true, status: true },
    });

    if (!admin || admin.status !== "active") return { isAdmin: false };
    return { isAdmin: true, userId: decoded.id, adminType: decoded.role };
  } catch {
    return { isAdmin: false };
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const method = req.method;

  switch (method) {
    // ============================= POST - Create or Reactivate Admin
    case "POST": {
      const { isAdmin: isUserAdmin, userId } = await isAdmin(req);
      // if (!isUserAdmin) return res.status(403).json({ message: "Access denied. Admins only." });

      interface AdminRequestBody {
        email: string;
        name: string;
        password: string;
        phone?: string;
        role: string;
      }

      const { email, name, password, phone, role } = req.body as AdminRequestBody;
      if (!email || !password) return res.status(400).json({ message: "Email & Password are required" });

      const existingAdmin = await prisma.admin.findUnique({ where: { email } });

      if (existingAdmin) {
        if (existingAdmin.status === "active") {
          return res.status(400).json({ message: "Email already exists and is active" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await prisma.admin.update({
          where: { email },
          data: { status: "active", name, role, password: hashedPassword, phone },
        });

        await sendAdminWelcomeEmail(email, name, password);

        await logActivity({
          req,
          action: "ADMIN_REACTIVATED",
          id: userId,
          type: "admin",
          description: `Admin with ${email} re-activated`,
        });

        return res.status(200).json({ message: "Admin re-activated successfully", email });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newAdmin = await prisma.admin.create({
        data: { email, name, password: hashedPassword, phone, role, status: "active" },
      });

      await sendAdminWelcomeEmail(email, name, password);

      await logActivity({
        req,
        action: "ADMIN_CREATED",
        id: userId,
        type: "admin",
        description: `New admin created with email: ${email}`,
      });

      return res.status(201).json({ message: "Admin created successfully", id: newAdmin.id });
    }

    // ============================= GET - Fetch Admins
    case "GET": {
      const admins = await prisma.admin.findMany({ where: { status: "active" } });
      return res.status(200).json({ admins });
    }

    // ============================= DELETE - Hard Delete (Archive)
    case "DELETE": {
      const { isAdmin: isUserAdmin, userId } = await isAdmin(req);
      if (!isUserAdmin) return res.status(403).json({ message: "Access denied. Admins only." });

      const { id } = req.body as { id?: number };
      if (!id) return res.status(400).json({ message: "ID is required" });

      const admin = await prisma.admin.update({
        where: { id },
        data: { status: "archived" },
      });

      await logActivity({
        req,
        action: "DELETE_ADMIN",
        id: userId,
        type: "admin",
        description: `Admin with ${admin.email} has been deleted`,
      });

      return res.status(200).json({ message: "Admin entry deleted" });
    }

    // ============================= PATCH - Archive Admin
    case "PATCH": {
      const { isAdmin: isUserAdmin, userId } = await isAdmin(req);
      if (!isUserAdmin) return res.status(403).json({ message: "Access denied. Admins only." });

      const { id } = req.body as { id?: number };
      if (!id) return res.status(400).json({ message: "User ID is required" });

      const admin = await prisma.admin.update({
        where: { id },
        data: { status: "archived" },
      });

      await logActivity({
        req,
        action: "ARCHIVED_ADMIN",
        id: userId,
        type: "admin",
        description: `Admin with ${admin.email} has been archived`,
      });

      return res.status(200).json({ message: "Admin has been archived", userId: id });
    }

    // ============================= PUT - Update Admin
    case "PUT": {
      const { isAdmin: isUserAdmin, userId } = await isAdmin(req);
      if (!isUserAdmin) return res.status(403).json({ message: "Access denied. Admins only." });

      interface UpdateAdminRequestBody {
        id: number;
        email?: string;
        name?: string;
        password?: string;
        phone?: string;
        role?: string;
      }

      const { id, email, name, password, phone, role } = req.body as UpdateAdminRequestBody;
      if (!id) return res.status(400).json({ message: "ID is required for update" });

      const updateData: Partial<UpdateAdminRequestBody> = { email, name, phone, role };
      if (password) updateData.password = await bcrypt.hash(password, 10);

      const updatedAdmin = await prisma.admin.update({
        where: { id },
        data: updateData,
      });

      await logActivity({
        req,
        action: "UPDATE_ADMIN",
        id: userId,
        type: "admin",
        description: `Admin with ${updatedAdmin.email} was updated`,
      });

      return res.status(200).json({ message: "Admin entry updated" });
    }

    // ============================= DEFAULT
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE", "PATCH"]);
      return res.status(405).json({ message: `Method ${method} Not Allowed` });
  }
}
