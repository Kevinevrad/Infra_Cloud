"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// TODO: Implement authentication middleware
// This middleware should verify the presence and validity of an authentication token (e.g., JWT) in the request headers.
const secret = process.env.JWT_SECRET;
if (!secret) {
    throw new Error("JWT_SECRET is not defined in environment variables");
}
// prettier-ignore
const auth = (req, res, next) => {
    var _a;
    const token = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.token;
    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        req.user = decoded;
        next();
    }
    catch (error) {
    }
    jsonwebtoken_1.default.verify(token, secret, (err) => {
        if (err) {
            return res.status(401).json({ error: err.message });
        }
        next();
    });
};
exports.default = auth;
