import { Hono } from 'hono'
import { db } from '../db/server'
import 'dotenv/config'
import { ProgramInfo, ClientProfile } from '$lib/db/schema'
import { setCookie, deleteCookie, getCookie } from 'hono/cookie'
import { prettyJSON } from 'hono/pretty-json'
// import { basicAuth } from 'hono/basic-auth'
import { and, eq, ne } from 'drizzle-orm'
import { HTTPException } from 'hono/http-exception'
// import { jwt } from 'hono/jwt'
import { logger } from 'hono/logger'
import { timing } from 'hono/timing'
import fs from 'fs'
import { Buffer } from 'buffer';

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
	const { id, category, location, startDate, compDate, by, active, admin, deleted } = args
	console.log(id, active)
	const cookieMe = getCookie(c, 'me')
	let me
	if (cookieMe) {
		me = JSON.parse(cookieMe)
	}
	if (me.role !== 'ADMIN') {
		throw new HTTPException(401, { message: 'Unauthorized' })
	}
	if (deleted) {
		await db.delete(ProgramInfo).where(eq(ProgramInfo.ProgramID, id))
		return c.json(true)
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
	await db.update(ProgramInfo).set({ Active: false, }).where(ne(ProgramInfo.ProgramID, id))
	const res = resA[0]
	return c.json(res)
})

router.post('/admin/programs/new', async (c) => {
	const args = await c.req.json()
	const { ProgramCategory,
		ProgramStartDate,
		ProgramCompDate,
		active,
		ProgramBy,
		ProgramValidity,
		ProgramLocation } = args
	const cookieMe = getCookie(c, 'me')
	let me
	if (cookieMe) {
		me = JSON.parse(cookieMe)
	}
	if (me.role !== 'ADMIN') {
		throw new HTTPException(401, { message: 'Unauthorized' })
	}
	console.log({ ProgramCategory, ProgramStartDate, ProgramCompDate, active, ProgramBy, ProgramValidity, ProgramLocation })
	// ProgramID: id, ProgramCategory: category, ProgramLocation: location, ProgramStartDate: startDate, ProgramCompDate: compDate, ProgramBy: by, ProgramAdmin: admin
	await db
		.insert(ProgramInfo).values({
			ProgramCategory,
			ProgramStartDate,
			ProgramCompDate,
			Active: active,
			ProgramBy,
			ProgramAdmin: me.id,
			ProgramLocation,
			ProgramValidity
		})
	return c.json(true)
})

router.post('/save/images', async (c) => {
	const args = await c.req.formData()
	const file = args.get('image')
	const type = args.get('type')
	console.log({ file, type })
	const cookieMe = getCookie(c, 'me')
	let me
	if (cookieMe) {
		me = JSON.parse(cookieMe)
	}
	const sewadarId = me.id
	// ProgramID: id, ProgramCategory: category, ProgramLocation: location, ProgramStartDate: startDate, ProgramCompDate: compDate, ProgramBy: by, ProgramAdmin: admin
	const programData = await db.select().from(ProgramInfo).where(eq(ProgramInfo.Active, true)).limit(1)
	const programId = programData[0].ProgramID
	console.log({ programId, sewadarId, type })
	// if (file) {
	// 	const filePath = path.join(`/${programId}/${sewadarId}/${type}+${file.name}`);
	// 	const reader = fs.createReadStream(file.);
	// 	const writer = fs.createWriteStream(filePath);

	// 	reader.pipe(writer);

	// 	writer.on('finish', () => {
	// 		console.log('File saved:', filePath);
	// 	});

	// 	writer.on('error', (err) => {
	// 		console.error('Error saving file:', err);
	// 	});
	// } else {
	// 	console.log('No file uploaded')
	// }
	return c.json(true)
})

router.post('/images/save-avatar', async (c) => {
	const args = await c.req.formData();
	const file = args.get('image');
	const type = args.get('type');

	if (!file) {
		return c.json({ error: 'No file provided' }, 400);
	}

	const buffer = await file.arrayBuffer()
	const fileContent = Buffer.from(buffer);       // 

	fs.mkdirSync('./static/avatar', { recursive: true });
	fs.writeFileSync(`./static/avatar/${type}.png`, fileContent);

	return c.json({ filePath: `./static/avatar/${type}.png` });
})

router.post('/images/update-avatar', async (c) => {
	const args = await c.req.formData()
	const avatarLocation = args.get('image')
	const type = args.get('type')
	const data = fs.readFileSync(avatarLocation)
	fs.writeFileSync(`./static/avatar/${type}.png`, data)
	fs.unlinkSync(avatarLocation)
	return c.json('./static/avatar/${type}.png')
})

router.post('/admin/users', async (c) => {
	const args = await c.req.json()
	const { id, approved, role, pending_approved, active } = args
	console.log({ id, approved, role, pending_approved, active })
	const userId = id
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
	if (active != undefined) {
		if (active) resA = await db
			.update(ClientProfile).set({ Active: active, ActivatedAt: new Date() }).where(eq(ClientProfile.ID, id)).returning({ id: ClientProfile.ID, name: ClientProfile.Name, sid: ClientProfile.sid, active: ClientProfile.Active, approved: ClientProfile.Approved })
		else resA = await db
			.update(ClientProfile).set({ Active: active }).where(eq(ClientProfile.ID, id)).returning({ id: ClientProfile.ID, name: ClientProfile.Name, sid: ClientProfile.sid, active: ClientProfile.Active, approved: ClientProfile.Approved })
	} else if (approved === undefined) { // When only role is changed
		console.log('role changed')
		resA = await db
			.update(ClientProfile).set({ Role: role }).where(eq(ClientProfile.ID, id)).returning({ id: ClientProfile.ID, name: ClientProfile.Name, sid: ClientProfile.sid, active: ClientProfile.Active, approved: ClientProfile.Approved })
	} else if (!pending_approved) { // to approve users in login-requests
		console.log('pending_approved changed')
		resA = await db
			.update(ClientProfile).set({ Approved: approved, ApprovedBy: approved ? me?.id : null, ApprovalDT: approved ? new Date() : null, Pending_Approval: pending_approved }).where(eq(ClientProfile.ID, userId)).returning({ id: ClientProfile.ID, name: ClientProfile.Name, sid: ClientProfile.sid, active: ClientProfile.Active, approved: ClientProfile.Approved })
	} else {
		resA = await db
			.update(ClientProfile).set({ Approved: approved, ApprovedBy: approved ? me?.id : null, ApprovalDT: approved ? new Date() : null }).where(eq(ClientProfile.ID, userId)).returning({ id: ClientProfile.ID, name: ClientProfile.Name, sid: ClientProfile.sid, active: ClientProfile.Active, approved: ClientProfile.Approved })
	}
	const res = resA[0]
	return c.json(res)
})

router.post('/admin/users/all', async (c) => {
	const args = await c.req.json()
	const { approved, pending_approved, active } = args
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
	if (active != undefined) {
		resA = await db
			.update(ClientProfile).set({ Active: active, ActivatedAt: new Date() }).where(eq(ClientProfile.Active, !active)).returning({ id: ClientProfile.ID, name: ClientProfile.Name, sid: ClientProfile.sid, active: ClientProfile.Active, approved: ClientProfile.Approved })
	} else if (!pending_approved) { // to approve users in login-requests
		resA = await db
			.update(ClientProfile).set({ Approved: approved, ApprovedBy: approved ? me.id : null, ApprovalDT: approved ? new Date() : null, Pending_Approval: pending_approved }).where(eq(ClientProfile.Pending_Approval, true)).returning({ id: ClientProfile.ID, name: ClientProfile.Name, sid: ClientProfile.sid, active: ClientProfile.Active, approved: ClientProfile.Approved })
	} else {
		resA = await db
			.update(ClientProfile).set({ Approved: approved, ApprovedBy: approved ? me.id : null, ApprovalDT: approved ? new Date() : null }).returning({ id: ClientProfile.ID, name: ClientProfile.Name, sid: ClientProfile.sid, active: ClientProfile.Active, approved: ClientProfile.Approved })
	}
	return c.json(resA)
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
	if (res.active == false) {
		return c.json({ sid: null, message: 'Please wait you are being activated' })
	} else if (res.approved == false) {
		await db
			.update(ClientProfile).set({ Pending_Approval: true }).where(and(eq(ClientProfile.MobileNo, phone), eq(ClientProfile.password, password)))
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
	const { phone, name, dob, gender, fatherName, center, aadharNo, qualification, sevaPreference, sevaPreference1, mobileAvailability, avatar } = args

	const formattedDOB = new Date(dob).toLocaleDateString('en-GB').replace(/\//g, '')

	console.log(formattedDOB)
	const resA = await db
		.select({ id: ClientProfile.ID, name: ClientProfile.Name, sid: ClientProfile.sid, active: ClientProfile.Active }).from(ClientProfile).where(eq(ClientProfile.MobileNo, phone))
	const userExist = resA[0]

	// console.log(!userExist, phone, name, dob)
	if (userExist) {
		return c.json({ status: 400, message: 'Phone number already registered' })
	}
	if (phone.length !== 10) {
		return c.json({ status: 400, message: 'Invalid Phone Number' })
	}
	console.log('aadharNo.length', aadharNo.length)
	if (aadharNo.length !== 12) {
		return c.json({ status: 400, message: 'Invalid Aadhar Number' })
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
		AadharNo: aadharNo.replace(/(.{4})/g, '$1-').slice(0, -1),
		Qualification: qualification,
		SevaPreference: sevaPreference,
		MobileAvailability: mobileAvailability,
		Avatar: avatar,
		SevaPreference1: sevaPreference1
	}
	console.log(postData)
	const res = await db
		.insert(ClientProfile).values(postData).returning({ id: ClientProfile.ID, name: ClientProfile.Name, phone: ClientProfile.MobileNo, dob: ClientProfile.DOB, role: ClientProfile.Role, gender: ClientProfile.Gender, approved: ClientProfile.Approved, approved_at: ClientProfile.ApprovalDT, fatherName: ClientProfile.FatherName, aadharNo: ClientProfile.AadharNo, qualification: ClientProfile.Qualification, center: ClientProfile.Centre, avatar: ClientProfile.Avatar })
	console.log(res)
	return c.json(res)
})

export const api = new Hono().route('/api', router)

export type Router = typeof router
