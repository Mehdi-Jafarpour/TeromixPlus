import { defineConfig } from "drizzle-kit";

// In production (Vercel), DATABASE_URL will be set
// In development, we'll use a fallback if it's not set
const databaseUrl = process.env.DATABASE_URL || 'postgresql://teromix_user:k85ZVCKaZynyleZMczpmH2FrZP0POCCT@dpg-d0vlpegdl3ps73frb3gg-a.oregon-postgres.render.com/teromix_wvds';

export default defineConfig({
  out: "./migrations",
  schema: "./shared/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: databaseUrl,
  },
});
