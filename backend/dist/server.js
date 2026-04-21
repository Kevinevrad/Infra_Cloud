"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app_1 = require("./src/app");
dotenv_1.default.config();
app_1.app.use((0, cors_1.default)());
app_1.app.use((0, cookie_parser_1.default)());
app_1.app.use(express_1.default.json());
app_1.app.use(express_1.default.urlencoded({ extended: true }));
app_1.app.listen(process.env.PORT, () => {
    console.log("Server lancer sur le PORT : 3000");
});
