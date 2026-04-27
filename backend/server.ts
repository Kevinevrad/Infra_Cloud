import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import express from "express";
import { app } from "./src/app";
import userRoutes from "./src/routes/user";

dotenv.config();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server lancer sur le PORT : 3000");
});
