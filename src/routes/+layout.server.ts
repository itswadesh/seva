import log from '$lib/utils/log.js'

export const load = async ({ url, cookies }) => {
  const me = cookies.get('me') || "{}"
  log.layout('/+layout.server.ts (load)')
  return { url: url.pathname, me }
}
