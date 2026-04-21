"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const app_1 = require("../app");
const router = express_1.default.Router();
// LOGIN
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }
    // prettier-ignore
    const user = yield app_1.prisma.user.findUnique({ where: { email: email, }, });
    if (!user) {
        return res.status(404).json({
            error: "No such User exist ",
        });
    }
    else if (user && user.password === password) {
        // prettier-ignore
        const token = jsonwebtoken_1.default.sign({ email }, process.env.JWT_SECRET, { expiresIn: "8h", });
        // Stockage du JWT dans un cookie HttpOnly
        // prettier-ignore
        res.status(200).cookie("jwtToken", token, { httpOnly: true, secure: true });
        res.status(200).json({ message: "Token Auth created!", token: token });
    }
    else {
        // prettier-ignore
        res.status(401).json({ message: "Auth Echouée", });
    }
}));
// CREATE USER
router.post("/register", (req, res) => {
    const body = req.body;
    try {
        if (!body.email || !body.password) {
            return res.status(400).json({
                error: "Champs Requis (Email & Password)",
            });
        }
    }
    catch (error) { }
});
