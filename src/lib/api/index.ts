import { Hono } from 'hono'
import { db } from '../db/server'
import 'dotenv/config'
import { ClientProfile } from '$lib/db/schema'
import { setCookie } from 'hono/cookie'
import { prettyJSON } from 'hono/pretty-json'
import { basicAuth } from 'hono/basic-auth'
import { and, eq } from 'drizzle-orm'

export const router = new Hono()
router.use(prettyJSON())
router.notFound((c) => c.json({ message: 'Not Found', ok: false }, 404))

router.post('/auth/login', async (c) => {
	const args = await c.req.json()
	const { phone, password } = args

	console.log({ phone, password })
	const auth = await basicAuth({ username: 'c.env.USERNAME', password: 'c.env.PASSWORD' })
	console.log(auth)
	// setCookie(JSON.stringify({ phone }), 'connect.sid', 'me', {
	// 	path: '/',
	// })

	const res = await db && db
		.select().from(ClientProfile).where(and(eq(ClientProfile.MobileNo, phone), eq(ClientProfile.password, password)))
	return c.json(res)
})
router.post('/auth/signup', async (c) => {
	const args = await c.req.json()
	const { phone, name, dob } = args

	const postData = [{
		Name: name,
		Role: 'WINDOW',
		MobileNo: phone,
		DOB: dob,
		password: dob
	}]

	console.log(postData)
	const res = await db && db
		.insert(ClientProfile).values(postData)
	return c.json(res)
})

export const api = new Hono().route('/api', router)

export type Router = typeof router
