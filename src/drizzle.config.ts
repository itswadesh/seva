import type { Config } from 'drizzle-kit'
import 'dotenv/config'
const DATABASE_URL = "postgresql://ritikranjan12:dfxQamq8Jz7j@ep-fragrant-sun-a177s6ib.ap-southeast-1.aws.neon.tech/seva?sslmode=require";

// if (!process.env.DATABASE_URL) {
// 	throw new Error('No url')
// }
export default {
	schema: './src/lib/db/schema.ts',
	out: './migrations',
	driver: 'pg',
	dbCredentials: {
		connectionString: DATABASE_URL
	}
} satisfies Config
