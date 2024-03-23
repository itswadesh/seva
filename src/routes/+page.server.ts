import { db } from '$lib/db/server'
import { movies } from '$lib/db/schema'
import { desc } from 'drizzle-orm'
export const load = async () => {
	try {
		const data = await db.select().from(movies).orderBy(desc(movies.id)).limit(20)
		return {
			data
		}
	} catch (e) {
		console.log(e)
	}
}
