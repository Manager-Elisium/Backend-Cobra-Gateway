import dotenv from "dotenv";

if (process.env.NODE_ENV === "production") {
  const cfg = `./.env.${process.env.NODE_ENV}`;
  dotenv.config({ path: cfg });
} else {
  dotenv.config();
}

export default {
  PORT: process.env.PORT,
  USER_AUTH_SERVICE: process.env.USER_AUTH_SERVICE || "http://192.168.1.46:3003",
  COBRA_GAME_PLAY_SERVICE:
    process.env.COBRA_GAME_PLAY_SERVICE || "http://192.168.1.46:3004",
  ADMIN_AUTH_SERVICE: process.env.ADMIN_AUTH_SERVICE || "http://192.168.1.46:3002",
  COBRA_ADMIN_SERVICE: process.env.COBRA_ADMIN_SERVICE || "http://192.168.1.46:3001",
  COBRA_CLUB_SERVICE: process.env.COBRA_CLUB_SERVICE || "http://192.168.1.46:3005",
};
