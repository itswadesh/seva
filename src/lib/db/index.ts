import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import 'dotenv/config'
// import { DATABASE_URL } from '$env/static/private';
// const DATABASE_URL = "postgresql://ritikranjan12:dfxQamq8Jz7j@ep-fragrant-sun-a177s6ib.ap-southeast-1.aws.neon.tech/seva?sslmode=require";
// const DATABASE_URL = 'postgres://postgres:unknown@148.113.8.188:5432/misiki'
// const client = dev ? postgres(DATABASE_URL) : postgres(DATABASE_URL, { ssl: 'require' });
const client = postgres(process.env.DATABASE_URL || '')
export const db = drizzle(client, {})
