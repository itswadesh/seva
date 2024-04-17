import log from '$lib/utils/log'
export const load = async ({ cookies }) => {
  const me = cookies.get('me') || "{}"
  log.layout('(app)/+layout.server.ts (load)')
  return { me }
}
