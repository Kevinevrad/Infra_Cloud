import express from "express";
import userController from "../controllers/usersController";
import { isAdmin } from "../middlewares/isAdmin";
import { auth } from "../middlewares/auth";

const router = express.Router();

// LOGIN
router.post("/login", userController.loginUser);

// CREATE USER
router.post("/register", auth, isAdmin, userController.registerUser);

// REMOVE USER
router.delete("/remove/:userId", auth, isAdmin, userController.removeUser);

// GET ALL USERS
router.get("/", auth, isAdmin, userController.getAllUsers);

// GET USER BY ID
router.get("/:userId", auth, isAdmin, userController.getUserById);

// UPDATE USER
router.put("/update/:userId", auth, isAdmin, userController.updateUser);

export default router;
