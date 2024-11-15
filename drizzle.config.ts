import type { Config } from "drizzle-kit"

export default {
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  database: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL as string
  }
} satisfies Config