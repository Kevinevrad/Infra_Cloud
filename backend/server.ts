import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookiePaser from "cookie-parser";
import { app } from "./src/app";
import userRoutes from "./src/routes/user";

dotenv.config();

app.use(cors());

app.use(cookiePaser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRoutes);

app.listen(process.env.PORT, () => {
  console.log("Server lancer sur le PORT : 3000");
});
