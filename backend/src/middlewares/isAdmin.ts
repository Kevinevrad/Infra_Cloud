import { Request, Response, NextFunction } from "express";
import { JwtPayload } from "jsonwebtoken";

type AuthenticatedRequest = Request & { user?: JwtPayload & { role?: string } };

// prettier-ignore
export const isAdmin = (req: AuthenticatedRequest, res: Response, next: NextFunction ) => {
  const { user } = req;

  if (user && user.role !== "ADMIN") {
    return res.status(403).json({
      message: "Accès refusé : Admin uniquement",
    });
  }

  next();
};
