import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.models";

interface AuthRequest extends Request {
  user?: any;
}

export const isAdmin = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    // Ambil token dari header
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Unauthorized" });

    // Verifikasi token
    const decoded: any = jwt.verify(token, process.env.JWT_KEY as string);
    
    if (!decoded) {
      return res.status(401).json({ error: "Invalid token or expired" });
    }

    const { dataValues } = decoded

    if (dataValues.role !== "admin") return res.status(403).json({ error: "Access denied" });

    req.user = dataValues;
    next();
  } catch (error) {
    console.error("JWT Error:", error);
    return res.status(401).json({ error: "Invalid token" });
  }
};
