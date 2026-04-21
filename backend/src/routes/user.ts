import express from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../app";

const router = express.Router();

// LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }
  // prettier-ignore
  const user = await prisma.user.findUnique({where: { email: email,},});

  if (!user) {
    return res.status(404).json({
      error: "No such User exist ",
    });
  } else if (user && user.password === password) {
    // prettier-ignore
    const token = jwt.sign({ email }, process.env.JWT_SECRET as string, { expiresIn: "8h", });

    // Stockage du JWT dans un cookie HttpOnly
    // prettier-ignore
    res.status(200).cookie("jwtToken", token, { httpOnly: true, secure: true });
    res.status(200).json({ message: "Token Auth created!", token: token });
  } else {
    // prettier-ignore
    res.status(401).json({message: "Auth Echouée",});
  }
});

// CREATE USER

router.post("/register", (req, res) => {
  const body = req.body;
  try {
    if (!body.email || !body.password) {
      return res.status(400).json({
        error: "Champs Requis (Email & Password)",
      });
    }
  } catch (error) {}
});

export default router;
