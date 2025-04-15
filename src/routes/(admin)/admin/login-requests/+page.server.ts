import { db } from '$lib/db'
import { ClientProfile } from '$lib/db/schema'
import { desc, eq } from 'drizzle-orm'
export const load = async () => {
  const result = await db.select({ id: ClientProfile.ID, name: ClientProfile.Name, phone: ClientProfile.MobileNo, dob: ClientProfile.DOB, role: ClientProfile.Role, approved: ClientProfile.Approved, approved_at: ClientProfile.ApprovalDT }).from(ClientProfile).where(eq(ClientProfile.Pending_Approval, true)).orderBy(desc(ClientProfile.ID)).limit(20)

  return {
    users: JSON.stringify(result)
  }
}