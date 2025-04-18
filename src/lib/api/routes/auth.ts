
import { and, eq, or, sql } from 'drizzle-orm'
import { Hono } from 'hono'
import { HTTPException } from 'hono/http-exception'
import { db } from '../../db'
import 'dotenv/config'
import { ProgramInfo, ClientProfile } from '$lib/db/schema'
import { setCookie, deleteCookie, getCookie } from 'hono/cookie'
// import { basicAuth } from 'hono/basic-auth'
// import { jwt } from 'hono/jwt'
const app = new Hono()

app.post('/logout', async (c) => {
  deleteCookie(c, 'me', { path: '/' })
  return c.json(true)
})

app.post('/check-user-exists', async (c) => {
  const args = await c.req.json()
  const { phone, aadhaarNo } = args
  const res = await db.select().from(ClientProfile).where(or(eq(ClientProfile.MobileNo, phone), eq(ClientProfile.AadhaarNo, aadhaarNo)))
  return c.json(!!res[0])
})

app.post('/login', async (c) => {
  const args = await c.req.json()
  const { phone, password } = args

  const resA = await db
    .select({ id: ClientProfile.ID, name: ClientProfile.Name, sid: ClientProfile.sid, active: ClientProfile.Active, approved: ClientProfile.Approved, role: ClientProfile.Role, module: ClientProfile.Module }).from(ClientProfile).where(and(eq(ClientProfile.MobileNo, phone), eq(ClientProfile.password, password)))
  const res = resA[0]
  if (!res) {
    deleteCookie(c, 'me', { path: '/' })
    return c.json({ sid: null, message: 'Invalid phone or password' })
  }
  // Add role validation
  const validRoles = ['WINDOW', 'BACKUP', 'PLANNING', 'ADMIN']
  if (!validRoles.includes(res.role)) {
    return c.json({ sid: null, message: 'Your role is not authorized to login' })
  }

  if (res.active == false) {
    return c.json({ sid: null, message: 'Please wait you are being activated' })
  } else if (res.approved == false) {
    await db
      .update(ClientProfile).set({ Pending_Approval: true }).where(and(eq(ClientProfile.MobileNo, phone), eq(ClientProfile.password, password)))
    return c.json({ sid: null, message: 'Please ask admin to approve your account' })
  }
  // setCookie(c, 'connect.sid', 'res.id', {
  // 	path: '/',
  // })
  const sid = crypto.randomUUID()
  // generate new auth token just in case
  const authenticatedUser = await db.update(ClientProfile)
    .set({ sid, LastSigninDT: new Date() })
    .where(eq(ClientProfile.MobileNo, phone))
    .returning({ id: ClientProfile.ID, name: ClientProfile.Name, sid: ClientProfile.sid, role: ClientProfile.Role, approved: ClientProfile.Approved, module: ClientProfile.Module })
  setCookie(c, 'me', JSON.stringify(authenticatedUser[0]), { path: '/' })
  return c.json(res)
})

app.post('/signup', async (c) => {
  const args = await c.req.json()
  const { phone, name, dob, gender, fatherName, center, aadhaarNo, qualification, sevaPreference, sevaPreference1, mobileAvailability, avatar, skills } = args

  // Add role validation for signup
  const validRoles = ['WINDOW', 'BACKUP', 'PLANNING', 'ADMIN']
  if (!validRoles.includes(sevaPreference)) {
    return c.json({ status: 400, message: 'Invalid seva preference selected' })
  }

  const formattedDOB = new Date(dob).toLocaleDateString('en-GB').replace(/\//g, '')

  const resA = await db
    .select({ id: ClientProfile.ID, name: ClientProfile.Name, sid: ClientProfile.sid, active: ClientProfile.Active }).from(ClientProfile).where(eq(ClientProfile.MobileNo, phone))
  const userExist = resA[0]

  if (userExist) {
    return c.json({ status: 400, message: 'Phone number already registered' })
  }
  if (phone.length !== 10) {
    return c.json({ status: 400, message: 'Invalid phone number' })
  }
  if (aadhaarNo.length !== 12) {
    return c.json({ status: 400, message: 'Invalid adhaar number' })
  }
  const postData = {
    Name: name,
    Role: sevaPreference, // Use sevaPreference as role directly
    MobileNo: phone,
    DOB: new Date(dob).toISOString(),
    password: formattedDOB,
    Gender: gender,
    Centre: center,
    FatherName: fatherName,
    AadhaarNo: aadhaarNo,
    Qualification: qualification,
    SevaPreference: sevaPreference,
    MobileAvailability: mobileAvailability,
    Avatar: avatar,
    SevaPreference1: sevaPreference1,
    Skills: skills
  }
  const res = await db
    .insert(ClientProfile).values(postData).returning({ id: ClientProfile.ID, name: ClientProfile.Name, phone: ClientProfile.MobileNo, dob: ClientProfile.DOB, role: ClientProfile.Role, gender: ClientProfile.Gender, approved: ClientProfile.Approved, approved_at: ClientProfile.ApprovalDT, fatherName: ClientProfile.FatherName, aadhaarNo: ClientProfile.AadhaarNo, qualification: ClientProfile.Qualification, center: ClientProfile.Centre, avatar: ClientProfile.Avatar })
  return c.json(res)
})

export default app
