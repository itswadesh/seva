
import { and, eq, or, sql } from 'drizzle-orm'
import { Hono } from 'hono'
import { db } from '../../db'
import 'dotenv/config'
import { ProgramInfo, ClientProfile, SangatData } from '$lib/db/schema'
// import { basicAuth } from 'hono/basic-auth'
// import { jwt } from 'hono/jwt'
const app = new Hono()

app.post('/check-token', async (c) => {
  const { tokenNo } = await c.req.json()
  const programId = await db.select().from(ProgramInfo).where(eq(ProgramInfo.Active, true))
  console.log(programId, tokenNo)
  const res = await db.select().from(SangatData).where(and(eq(SangatData.TokenNo, tokenNo), eq(SangatData.ProgramID, programId[0].ProgramID)))
  return c.json(!!res[0])
})

export default app
