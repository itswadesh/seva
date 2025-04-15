
import { and, eq, or, sql } from 'drizzle-orm'
import { Hono } from 'hono'
import { db } from '../../db'
import 'dotenv/config'
import { ProgramInfo, ClientProfile, SangatData } from '$lib/db/schema'
import { getCookie } from 'hono/cookie'
// import { basicAuth } from 'hono/basic-auth'
// import { jwt } from 'hono/jwt'
const app = new Hono()

app.post('/give-back', async (c) => {
  const cookieMe = getCookie(c, 'me')
  let me
  if (cookieMe) {
    me = JSON.parse(cookieMe)
  }
  const sewadarId = me.id
  console.log(sewadarId, 'sssssssssssss')
  const { tokenNo } = await c.req.json()
  // return c.json(tokenNo)
  const programId = await db.select().from(ProgramInfo).where(eq(ProgramInfo.Active, true))
  const res = await db.update(SangatData).set({ GiveBack_SewadarID: sewadarId, GiveBackStatus:'GIVEN BACK', GiveBackDT: new Date() }).where(and(eq(SangatData.TokenNo, tokenNo), eq(SangatData.ProgramID, programId[0].ProgramID)))
  console.log(tokenNo, programId[0].ProgramID, res, 'res')
  return c.json(!!res[0])
})

app.post('/dispute', async (c) => {
  const cookieMe = getCookie(c, 'me')
  let me
  if (cookieMe) {
    me = JSON.parse(cookieMe)
  }
  const sewadarId = me.id
  console.log(sewadarId, 'sssssssssssss')
  const { tokenNo } = await c.req.json()
  // return c.json(tokenNo)
  const programId = await db.select().from(ProgramInfo).where(eq(ProgramInfo.Active, true))
  const res = await db.update(SangatData).set({ GiveBack_SewadarID: sewadarId, GiveBackStatus:'GIVEN BACK', GiveBackDT: new Date() }).where(and(eq(SangatData.TokenNo, tokenNo), eq(SangatData.ProgramID, programId[0].ProgramID)))
  console.log(tokenNo, programId[0].ProgramID, res, 'res')
  return c.json(!!res[0])
})

app.post('/check-token', async (c) => {
  const { tokenNo } = await c.req.json()
  const programId = await db.select().from(ProgramInfo).where(eq(ProgramInfo.Active, true))
  const res = await db.select().from(SangatData).where(and(eq(SangatData.TokenNo, tokenNo), eq(SangatData.ProgramID, programId[0].ProgramID)))
  console.log(tokenNo, programId[0].ProgramID, res, 'res')
  return c.json(!!res[0])
})

app.get('/get-token-data', async (c) => {
  const { token_no } = c.req.query()
  const programId = await db.select().from(ProgramInfo).where(eq(ProgramInfo.Active, true))
  const res = await db.select().from(SangatData).where(and(eq(SangatData.TokenNo, token_no), eq(SangatData.ProgramID, programId[0].ProgramID)))
  return c.json(res[0])
})

export default app
