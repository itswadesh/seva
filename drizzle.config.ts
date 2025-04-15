import { defineConfig } from "drizzle-kit";
import 'dotenv/config'
if (!process.env.DATABASE_URL) {
	throw new Error('No url')
}
export default defineConfig({
  schema: "./src/lib/db/schema/index.ts",
  out: "./src/lib/db/migrations",
  dialect: 'postgresql',
	dbCredentials: {
		url: process.env.DATABASE_URL
	},
	verbose: true,
	strict: true,
	casing: 'snake_case'
})
