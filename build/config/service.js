"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
if (process.env.NODE_ENV === "production") {
    const cfg = `./.env.${process.env.NODE_ENV}`;
    dotenv_1.default.config({ path: cfg });
}
else {
    dotenv_1.default.config();
}
exports.default = {
    PORT: process.env.PORT,
    USER_AUTH_SERVICE: process.env.USER_AUTH_SERVICE || "http://localhost:3003",
    COBRA_GAME_PLAY_SERVICE: process.env.COBRA_GAME_PLAY_SERVICE || "http://localhost:3004",
    ADMIN_AUTH_SERVICE: process.env.ADMIN_AUTH_SERVICE || "http://localhost:3002",
    COBRA_ADMIN_SERVICE: process.env.COBRA_ADMIN_SERVICE || "http://localhost:3001",
    COBRA_CLUB_SERVICE: process.env.COBRA_CLUB_SERVICE || "http://localhost:3005",
};
