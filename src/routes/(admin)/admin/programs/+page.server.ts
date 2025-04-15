import { db } from '$lib/db'
import { ProgramInfo } from '$lib/db/schema'
import { desc } from 'drizzle-orm'
export const load = async () => {
	const result = await db.select({ id: ProgramInfo.ProgramID, category: ProgramInfo.ProgramCategory, location: ProgramInfo.ProgramLocation, startDate: ProgramInfo.ProgramStartDate, compDate: ProgramInfo.ProgramCompDate, by: ProgramInfo.ProgramBy, active: ProgramInfo.Active, admin: ProgramInfo.ProgramAdmin }).from(ProgramInfo).orderBy(desc(ProgramInfo.ProgramID)).limit(20)

	return {
		programs: JSON.stringify(result)
	}
}
