import { redirect } from '@sveltejs/kit'

export const load = async ({ fetch, url }) => {
  const tokenNo = url.searchParams.get('token_no')
  const response = await fetch(`/api/sangat/check-token`, {
    method: 'POST',
    body: JSON.stringify({ tokenNo })
  })
  const data = await response.json()
  if (data) {
    redirect(307, '/collect3/invalid-token')
  }
  redirect(307, `/collect3/step2?token_no=${tokenNo}`)
}
