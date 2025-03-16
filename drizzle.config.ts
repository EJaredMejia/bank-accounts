import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./migrations",
  schema: "./src/database/models/database.schemas.ts",
  dialect: "sqlite",
  dbCredentials: {
    url: Deno.env.get("DB_FILE_NAME")!,
  },
});
