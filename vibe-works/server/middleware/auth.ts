import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

declare module "express-serve-static-core" {
  interface Request {
    user?: { email: string; emp_id: number };
  }
}

export interface AuthRequest extends Request {
  user?: any;
}

export const verifyToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { email: string; emp_id: number };
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};