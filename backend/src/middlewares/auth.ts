import { Request, Response, NextFunction, response } from "express";
import jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";

// TODO: Implement authentication middleware
// This middleware should verify the presence and validity of an authentication token (e.g., JWT) in the request headers.

const secret = process.env.JWT_SECRET;
if (!secret) {
  throw new Error("JWT_SECRET is not defined in environment variables");
}

// prettier-ignore
const auth = (req: Request, res: Response, next: NextFunction) => {

  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded:JwtPayload = jwt.verify(token,secret ) as JwtPayload

    (req as any ).user = decoded;
    next();
  } catch (error) {
    
  }

  jwt.verify(token,secret, (err:any) => {
    if (err) {
      return res.status(401).json({ error: err.message });
    }
    next();
  });
};

export default auth;
