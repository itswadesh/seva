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

app.post('/programs', async (c) => {
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

app.post('/programs/new', async (c) => {
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

app.post('/users', async (c) => {
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

app.post('/users/all', async (c) => {
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

export default app
