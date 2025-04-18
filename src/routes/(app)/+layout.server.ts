import { db } from '$lib/db'
import { ProgramInfo } from '$lib/db/schema'
import log from '$lib/utils/log'
import { eq } from 'drizzle-orm'
import { redirect } from '@sveltejs/kit'
export const load = async ({ cookies }) => {
  const me = cookies.get('me') || "{}"
  log.layout('(app)/+layout.server.ts (load)')
  const programData = (await db.select().from(ProgramInfo).where(eq(ProgramInfo.Active, true)).limit(1))[0]
  if(!cookies.get('me')) {
    redirect(302, '/auth/login')
  }
  return { me, programData }
}
