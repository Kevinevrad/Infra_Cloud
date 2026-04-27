import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

type JwtUser = {
  userId: string;
  email: string;
  role: string;
};

interface AuthRequest extends Request {
  user?: JwtUser;
}

const secret = process.env.JWT_SECRET;

if (!secret) {
  throw new Error("JWT_SECRET is not defined");
}

export const auth = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({
      message: "Access denied. No token provided.",
    });
  }

  try {
    const decoded = jwt.verify(token, secret) as JwtUser;
    console.log(decoded);

    // ✅ Validation minimale du payload
    if (!decoded.userId || !decoded.role) {
      return res.status(401).json({
        message: "Invalid token payload",
      });
    }

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};
