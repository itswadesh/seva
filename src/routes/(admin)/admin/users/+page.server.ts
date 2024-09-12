import { db } from '$lib/db/server'
import { ClientProfile } from '$lib/db/schema'
import { desc } from 'drizzle-orm'
export const load = async () => {
	const result = await db.select({ id: ClientProfile.ID, name: ClientProfile.Name, phone: ClientProfile.MobileNo, dob: ClientProfile.DOB, role: ClientProfile.Role, approved: ClientProfile.Approved, approved_at: ClientProfile.ApprovalDT, avatar: ClientProfile.Avatar }).from(ClientProfile).orderBy(desc(ClientProfile.ID)).limit(20)
	console.log('result:', result)
	return {
		users: JSON.stringify(result)
	}
}
