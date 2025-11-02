import type { Request, Response } from "express";
import { auth } from "./auth";

export async function requireAuth(
  req: Request,
  res: Response,
  next: () => void
) {
  try {
    const session = await auth.api.getSession({
      headers: req.headers as any,
    });

    if (!session) {
      return res.status(401).json({
        error: "Unauthorized",
        message: "You must be logged in to access this endpoint",
      });
    }

    (req as any).user = session.user;
    (req as any).session = session.session;
    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    return res.status(401).json({
      error: "Unauthorized",
      message: "Invalid or expired session",
    });
  }
}
