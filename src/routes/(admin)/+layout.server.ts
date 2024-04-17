import log from '$lib/utils/log'
export const load = async ({ cookies }) => {
  const me = cookies.get('me') || "{}"
  log.layout('(admin)/+layout.server.ts (load)')
  return { me }
}
