import { db } from '$lib/db'
import { SangatData } from '$lib/db/schema'
import { desc } from 'drizzle-orm'
export const load = async () => {
	const result = await db.select().from(SangatData).orderBy(desc(SangatData.ID)).limit(20)

	console.log(result)
	return {
		sangatData: JSON.stringify(result)
	}
}
