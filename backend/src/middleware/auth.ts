import type { Request, Response, NextFunction } from "express";

import { JWT } from "../lib/jwt";
import ErrorResponse from "../utilities/errorResponse";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
      };
    }
  }
}

export async function auth(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies?.access_token || extractBearer(req);
  if (!token) {
    throw new ErrorResponse("Access denied. Authentication required", 401);
  }
  const payload = await new JWT().verifyToken(token);

  if (!payload) {
    res.status(401).json({ error: "Invalid or expired token." });
    return;
  }

  req.user = {
    id: payload.id,
    email: payload.email,
  };
  next();
}

function extractBearer(req: Request): string | null {
  const auth = req.headers.authorization;
  if (auth && auth.startsWith("Bearer ")) return auth.slice(7);
  return null;
}
