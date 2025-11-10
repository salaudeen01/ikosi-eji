
import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextApiRequest } from 'next';

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
    } catch {
      throw new Error("Invalid or expired token");
    }
  }