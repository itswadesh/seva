import { Hono } from 'hono'
import { db } from '../db/server'
import 'dotenv/config'
import { ProgramInfo, ClientProfile } from '$lib/db/schema'
import { setCookie, deleteCookie, getCookie } from 'hono/cookie'
import { prettyJSON } from 'hono/pretty-json'
// import { basicAuth } from 'hono/basic-auth'
import { and, eq } from 'drizzle-orm'
import { HTTPException } from 'hono/http-exception'
// import { jwt } from 'hono/jwt'
import { logger } from 'hono/logger'
import { timing } from 'hono/timing'

export const router = new Hono()
// router.use('/auth/*', jwt({ secret: 'it-is-very-secret' }))
router.use(prettyJSON())
router.use(logger())
router.use(timing());
router.notFound((c) => c.json({ message: 'Not Found', ok: false }, 404))

router.post('/auth/logout', async (c) => {
	deleteCookie(c, 'me', { path: '/' })
	return c.json(true)
})

router.post('/admin/programs', async (c) => {
	const args = await c.req.json()
	const { id, category, location, startDate, compDate, by, active, admin } = args
	console.log(id, active)
	const cookieMe = getCookie(c, 'me')
	let me
	if (cookieMe) {
		me = JSON.parse(cookieMe)
	}
	if (me.role !== 'ADMIN') {
		throw new HTTPException(401, { message: 'Unauthorized' })
	}
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const q: any = { Active: active }
	category ? q.ProgramCategory = category : null
	location ? q.ProgramLocation = location : null
	startDate ? q.ProgramStartDate = startDate : null
	compDate ? q.ProgramCompDate = compDate : null
	by ? q.ProgramBy = by : null
	admin ? q.ProgramAdmin = admin : null

	// ProgramID: id, ProgramCategory: category, ProgramLocation: location, ProgramStartDate: startDate, ProgramCompDate: compDate, ProgramBy: by, ProgramAdmin: admin
	const resA = await db
		.update(ProgramInfo).set(q).where(eq(ProgramInfo.ProgramID, id)).returning({ id: ProgramInfo.ProgramID })
	const res = resA[0]
	return c.json(res)
})

router.post('/admin/users', async (c) => {
	const args = await c.req.json()
	const { id, approved, role } = args
	const cookieMe = getCookie(c, 'me')
	let me
	if (cookieMe) {
		me = JSON.parse(cookieMe)
	}
	// console.log({ id, approved })
	if (me.role !== 'ADMIN') {
		throw new HTTPException(401, { message: 'Unauthorized' })
	}
	let resA = []
	if (approved === undefined) { // When only role is changed
		resA = await db
			.update(ClientProfile).set({ Role: role }).where(eq(ClientProfile.ID, id)).returning({ id: ClientProfile.ID, name: ClientProfile.Name, sid: ClientProfile.sid, active: ClientProfile.Active, approved: ClientProfile.Approved })
	} else {
		resA = await db
			.update(ClientProfile).set({ Approved: approved, ApprovedBy: approved ? me.id : null, ApprovalDT: approved ? new Date() : null }).where(eq(ClientProfile.ID, id)).returning({ id: ClientProfile.ID, name: ClientProfile.Name, sid: ClientProfile.sid, active: ClientProfile.Active, approved: ClientProfile.Approved })
	}
	const res = resA[0]
	return c.json(res)
})

router.post('/auth/login', async (c) => {
	const args = await c.req.json()
	const { phone, password } = args

	// console.log({ phone, password })

	const resA = await db
		.select({ id: ClientProfile.ID, name: ClientProfile.Name, sid: ClientProfile.sid, active: ClientProfile.Active, approved: ClientProfile.Approved }).from(ClientProfile).where(and(eq(ClientProfile.MobileNo, phone), eq(ClientProfile.password, password)))
	const res = resA[0]
	// console.log(res)
	if (!res) {
		deleteCookie(c, 'me', { path: '/' })
		// throw new HTTPException(401, { message: 'Invalid phone or password' }) // Can not throw exception because HTTPException will not set cookie at Client side Application
		return c.json({ sid: null, message: 'Invalid phone or password' })
	}
	if (res.approved == false) {
		return c.json({ sid: null, message: 'Please ask admin to activate your account' })
	}
	// setCookie(c, 'connect.sid', 'res.id', {
	// 	path: '/',
	// })
	const sid = crypto.randomUUID()
	// generate new auth token just in case
	const authenticatedUser = await db.update(ClientProfile)
		.set({ sid, LastSigninDT: new Date() })
		.where(eq(ClientProfile.MobileNo, phone))
		.returning({ id: ClientProfile.ID, name: ClientProfile.Name, sid: ClientProfile.sid, role: ClientProfile.Role, approved: ClientProfile.Approved })
	setCookie(c, 'me', JSON.stringify(authenticatedUser[0]), { path: '/' })
	return c.json(res)
})

router.post('/auth/signup', async (c) => {
	const args = await c.req.json()
	const { phone, name, dob, gender, fatherName, center, aadharNo, qualification, sevaPreference, mobileAvailability } = args

	const formattedDOB = new Date(dob).toLocaleDateString('en-GB').replace(/\//g, '-')

	// console.log(formattedDOB)
	const resA = await db
		.select({ id: ClientProfile.ID, name: ClientProfile.Name, sid: ClientProfile.sid, active: ClientProfile.Active }).from(ClientProfile).where(eq(ClientProfile.MobileNo, phone))
	const userExist = resA[0]

	// console.log(!userExist, phone, name, dob)
	if (userExist) {
		return c.json({ status: 400, message: 'Phone number already registered' })
	}
	const postData = {
		Name: name,
		Role: 'WINDOW',
		MobileNo: phone,
		DOB: new Date(dob).toISOString(),
		password: formattedDOB,
		Gender: gender,
		Centre: center,
		FatherName: fatherName,
		AadharNo: aadharNo,
		Qualification: qualification,
		SevaPreference: sevaPreference,
		MobileAvailability: mobileAvailability,
	}
	console.log(postData)
	const res = await db
		.insert(ClientProfile).values(postData).returning({ id: ClientProfile.ID, name: ClientProfile.Name, phone: ClientProfile.MobileNo, dob: ClientProfile.DOB, role: ClientProfile.Role, gender: ClientProfile.Gender, approved: ClientProfile.Approved, approved_at: ClientProfile.ApprovalDT, fatherName: ClientProfile.FatherName, aadharNo: ClientProfile.AadharNo, qualification: ClientProfile.Qualification, center: ClientProfile.Centre })
	console.log(res)
	return c.json(true)
})

export const api = new Hono().route('/api', router)

export type Router = typeof router
