import { db } from '$lib/db/server'
import { customers } from '$lib/db/schema'
import { desc } from 'drizzle-orm'
export const load = async () => {
	const result = await db.select().from(customers).orderBy(desc(customers.id)).limit(20)
	return {
		result
	}
}
