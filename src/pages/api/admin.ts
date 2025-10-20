import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../lib/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import type { ResultSetHeader, RowDataPacket } from "mysql2";
import { sendAdminWelcomeEmail } from "@/lib/mailer";

// ✅ Define the user row shape
interface User extends RowDataPacket {
  id: number;
  email: string;
  password: string;
  name: string;
  role: string;
  status: "active" | "archived" | string;
  phone?: string;
}

// ✅ Define a typed error type for MySQL
interface MySqlError extends Error {
  code?: string;
  errno?: number;
  sqlMessage?: string;
}

interface JwtPayload {
  id: number;
  role: string;
  email: string;
}

async function isAdmin(req: NextApiRequest): Promise<{ isAdmin: boolean; userId?: number }> {
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

    // Optionally confirm in DB that user is still active
    const [rows] = await db.query<User[]>(
      "SELECT id FROM users WHERE id = ? AND status = ? AND role = ?",
      [decoded.id, "active", "admin"]
    );

    if (!rows.length) {
      return { isAdmin: false };
    }

    return { isAdmin: true, userId: decoded.id };
  } catch (error) {
    return { isAdmin: false };
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const method = req.method;

  switch (method) {
    // ============================= POST
    case "POST": {
      const { isAdmin: isUserAdmin } = await isAdmin(req);

      if (!isUserAdmin) {
        return res.status(403).json({ message: "Access denied. Admins only." });
      }

      const { email, name, password, phone, role } = req.body as {
        email?: string;
        name?: string;
        password?: string;
        phone?: string;
        role?: string;
      };

      if (!email || !password) {
        return res.status(400).json({ message: "Email & Password are required" });
      }

      try {
        const [existingUsers] = await db.query<User[]>(
          "SELECT * FROM admin WHERE email = ?",
          [email]
        );

        if (existingUsers.length > 0) {
          const existingUser = existingUsers[0];

          if (existingUser.status === "active") {
            return res.status(400).json({ message: "Email already exists and is active" });
          }

          await db.query<ResultSetHeader>(
            "UPDATE admin SET status = ?, name = ?, role = ?, password = ? WHERE email = ?",
            ["active", name, role, await bcrypt.hash(password, 10), email]
          );

          // send reactivation mail
          await sendAdminWelcomeEmail(email, name, password);

          return res.status(200).json({
            message: "Admin re-activated successfully",
            email,
          });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const [result] = await db.query<ResultSetHeader>(
          "INSERT INTO admin (email, password, phone, name, role, status) VALUES (?, ?, ?, ?, ?, ?)",
          [email, hashedPassword, phone, name, role, "active"]
        );

        // send welcome mail
        await sendAdminWelcomeEmail(email, name, password);

        return res.status(201).json({
          message: "Admin created successfully",
          id: result.insertId,
        });
      } catch (err) {
        const error = err as MySqlError;
        if (error.code === "ER_DUP_ENTRY") {
          return res.status(409).json({ message: "Email already exists" });
        }
        return res.status(500).json({ message: "Database error", error: error.sqlMessage || error.message });
      }
    }

    // ============================= GET
    case "GET": {
      try {
        const [rows] = await db.query<User[]>(
          "SELECT * FROM admin WHERE status = ?",
          ["active"]
        );

        return res.status(200).json({ admins: rows });
      } catch (err) {
        const error = err as MySqlError;
        return res.status(500).json({ message: "Database error", error: error.sqlMessage || error.message });
      }
    }

    // ============================= DELETE
    case "DELETE": {
      const { isAdmin: isUserAdmin } = await isAdmin(req);

      if (!isUserAdmin) {
        return res.status(403).json({ message: "Access denied. Admins only." });
      }
      const { id } = req.body as { id?: number };

      if (!id) {
        return res.status(400).json({ message: "ID is required" });
      }

      try {
        await db.query<ResultSetHeader>(
          "UPDATE admin SET status = ? WHERE id = ?",
          ["archived", id]
        );
        return res.status(200).json({ message: "User entry deleted" });
      } catch (err) {
        const error = err as MySqlError;
        return res.status(500).json({ message: "Database error", error: error.sqlMessage || error.message });
      }
    }

    // ============================= PATCH
    case "PATCH": {
      const { isAdmin: isUserAdmin } = await isAdmin(req);

      if (!isUserAdmin) {
        return res.status(403).json({ message: "Access denied. Admins only." });
      }
      const { id } = req.body as { id?: number };

      if (!id) {
        return res.status(400).json({ message: "User ID is required" });
      }

      try {
        const [result] = await db.query<ResultSetHeader>(
          "UPDATE admin SET status = ? WHERE id = ?",
          ["archived", id]
        );

        if (result.affectedRows === 0) {
          return res.status(404).json({ message: "Admin not found" });
        }

        return res.status(200).json({
          message: "Admin has been archived",
          userId: id,
        });
      } catch (err) {
        const error = err as MySqlError;
        return res.status(500).json({ message: "Database error", error: error.sqlMessage || error.message });
      }
    }

    // ============================= PUT
    case "PUT": {
      const { isAdmin: isUserAdmin } = await isAdmin(req);

      if (!isUserAdmin) {
        return res.status(403).json({ message: "Access denied. Admins only." });
      }
      const { id, email, name, password, phone, role } = req.body as {
        id?: number;
        email?: string;
        name?: string;
        password?: string;
        phone?: string;
        role?: string;
      };

      if (!id) {
        return res.status(400).json({ message: "ID is required for update" });
      }

      try {
        await db.query<ResultSetHeader>(
          "UPDATE admin SET name = ?, phone = ?, email = ?, password = ?, role = ? WHERE id = ?",
          [name || null, phone || null, email || null, password || null, role || null, id]
        );

        return res.status(200).json({ message: "Admin entry updated" });
      } catch (err) {
        const error = err as MySqlError;
        return res.status(500).json({ message: "Database error", error: error.sqlMessage || error.message });
      }
    }

    // ============================= DEFAULT
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE", "PATCH"]);
      return res.status(405).json({ message: `Method ${method} Not Allowed` });
  }
}
