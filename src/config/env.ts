import dotenv from "dotenv";

dotenv.config();

const port = Number(process.env.PORT ?? 3000);

if (Number.isNaN(port)) {
  throw new Error("PORT must be a valid number.");
}

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined. Copy .env.example to .env and update it.");
}

export const env = {
  nodeEnv: process.env.NODE_ENV ?? "development",
  port,
  databaseUrl: process.env.DATABASE_URL,
};
