import { defineConfig } from "drizzle-kit";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL, ensure the database is provisioned");
}

const databaseUrl = process.env.DATABASE_URL || 'sqlite:./dev.db';

export default defineConfig({
  out: "./migrations",
  schema: "./shared/schema.ts",
  dialect: process.env.DATABASE_URL ? "postgresql" : "sqlite",
  dbCredentials: {
    url: databaseUrl,
  },
});
