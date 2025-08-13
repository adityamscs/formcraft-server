import { Request, Response, NextFunction } from "express";
import { User } from "../models/User";

declare global {
  namespace Express {
    interface Request {
      user?: { uid: string; [key: string]: any };
    }
  }
}

// Assumes Firebase UID is in req.user.uid (set by previous auth middleware)
export function requireRole(roles: string[]) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const uid = req.user?.uid;
    if (!uid) return res.status(401).json({ error: "Unauthorized" });
    const user = await User.findOne({ uid });
    if (!user || !roles.includes(user.role)) {
      return res.status(403).json({ error: "Forbidden" });
    }
    next();
  };
}