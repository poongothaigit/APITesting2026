import dotenv from "dotenv";
dotenv.config();

if (!process.env.BASE_URL) {
  throw new Error("❌ BASE_URL is not defined. Check .env or GitHub Secrets.");
}
export const BASE_URL = process.env.BASE_URL;
