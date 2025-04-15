import log from '$lib/utils/log'
import { redirect } from '@sveltejs/kit'
export const load = async ({ cookies }) => {
  let me = cookies.get('me') || "{}"
  if (me) me = JSON.parse(me)
  if (me?.role != 'ADMIN') {
    redirect(304, '/')
  }
  log.layout('(admin)/+layout.server.ts (load)')
  return { me }
}
