import type { Config } from 'drizzle-kit'
import 'dotenv/config'
if (!process.env.DATABASE_URL) {
	throw new Error('No url')
}
export default {
	schema: './src/lib/db/schema.ts',
	out: './migrations',
	driver: 'pg',
	dbCredentials: {
		connectionString: process.env.DATABASE_URL
	}
} satisfies Config
