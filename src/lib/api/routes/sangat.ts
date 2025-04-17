
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
  const { tokenNo } = await c.req.json()
  const programId = await db.select().from(ProgramInfo).where(eq(ProgramInfo.Active, true))
  if (!programId[0]) {
    return c.json({ message: 'No active program found' }, 404)
  }
  const tokenData = await db.select().from(SangatData).where(and(eq(SangatData.TokenNo, tokenNo), eq(SangatData.ProgramID, programId[0].ProgramID)))
  if (!tokenData[0]) {
    return c.json({ message: 'Token not found' }, 404)
  }
  const isGivenBack = tokenData[0].GiveBackStatus === 'GIVEN BACK'
  const isDisputed = tokenData[0].GiveBackStatus === 'DISPUTED'
  if (isGivenBack) {
    return c.json({ message: 'Token is already given back' }, 400)
  }
  if (isDisputed) {
    return c.json({ message: 'Token is Disputed. Please Contact Admin.' }, 400)
  }
  const res = await db.update(SangatData).set({ GiveBack_SewadarID: sewadarId, GiveBackStatus: 'GIVEN BACK', GiveBackDT: new Date().toISOString() }).where(and(eq(SangatData.TokenNo, tokenNo), eq(SangatData.ProgramID, programId[0].ProgramID))).returning()
  return c.json(res[0])
})

app.post('/dispute', async (c) => {
  const cookieMe = getCookie(c, 'me')
  let me
  if (cookieMe) {
    me = JSON.parse(cookieMe)
  }
  const sewadarId = me.id
  const { tokenNo } = await c.req.json()
  const programId = await db.select().from(ProgramInfo).where(eq(ProgramInfo.Active, true))
  if (!programId[0]) {
    return c.json({ message: 'No active program found' }, 404)
  }
  const tokenData = await db.select().from(SangatData).where(and(eq(SangatData.TokenNo, tokenNo), eq(SangatData.ProgramID, programId[0].ProgramID)))
  if (!tokenData[0]) {
    return c.json({ message: 'Token not found' }, 404)
  }
  const isGivenBack = tokenData[0].GiveBackStatus === 'GIVEN BACK'
  const isDisputed = tokenData[0].GiveBackStatus === 'DISPUTED'
  if (isGivenBack) {
    return c.json({ message: 'Token is already given back' }, 400)
  }
  if (isDisputed) {
    return c.json({ message: 'Token is already disputed' }, 400)
  }
  const res = await db.update(SangatData).set({ GiveBack_SewadarID: sewadarId, GiveBackStatus: 'DISPUTED', GiveBackDT: new Date().toISOString() }).where(and(eq(SangatData.TokenNo, tokenNo), eq(SangatData.ProgramID, programId[0].ProgramID))).returning()
  return c.json(res[0])
})

app.post('/check-token', async (c) => {
  const { tokenNo } = await c.req.json()
  const programId = await db.select().from(ProgramInfo).where(eq(ProgramInfo.Active, true))
  if (!programId[0]) {
    return c.json({ message: 'No active program found' }, 404)
  }
  const tokenData = await db.select().from(SangatData).where(and(eq(SangatData.TokenNo, tokenNo), eq(SangatData.ProgramID, programId[0].ProgramID)))
  if (!tokenData[0]) {
    return c.json({ message: 'Token not found' }, 404)
  }
  const isGivenBack = tokenData[0].GiveBackStatus === 'GIVEN BACK'
  const isDisputed = tokenData[0].GiveBackStatus === 'DISPUTED'
  if (isGivenBack) {
    return c.json({ message: 'Mobile is Already Given Back.' }, 400)
  }
  if (isDisputed) {
    return c.json({ message: 'Token is Disputed. Please Contact Admin.' }, 400)
  }
  return c.json(!!tokenData[0])
})

app.post('/check-collection-token', async (c) => {
  const { tokenNo } = await c.req.json()
  const programId = await db.select().from(ProgramInfo).where(eq(ProgramInfo.Active, true))
  if (!programId[0]) {
    return c.json({ message: 'No active program found' }, 404)
  }
  const res = await db.select().from(SangatData).where(and(eq(SangatData.TokenNo, tokenNo), eq(SangatData.ProgramID, programId[0].ProgramID)))
  return c.json(!!res[0])
})

app.get('/get-token-data', async (c) => {
  const { token_no } = c.req.query()
  const programId = await db.select().from(ProgramInfo).where(eq(ProgramInfo.Active, true))
  if (!programId[0]) {
    return c.json({ message: 'No active program found' }, 404)
  }
  const res = await db.select().from(SangatData).where(and(eq(SangatData.TokenNo, token_no), eq(SangatData.ProgramID, programId[0].ProgramID)))
  return c.json(res[0])
})

export default app
