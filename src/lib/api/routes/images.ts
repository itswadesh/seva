
import { and, eq, or, sql } from 'drizzle-orm'
import { Hono } from 'hono'
import { HTTPException } from 'hono/http-exception'
import { db } from '../../db'
import fs from 'fs'
import { Buffer } from 'buffer';
import 'dotenv/config'
import sharp from 'sharp'
import { ProgramInfo, ClientProfile } from '$lib/db/schema'
import { setCookie, deleteCookie, getCookie } from 'hono/cookie'
// import { basicAuth } from 'hono/basic-auth'
// import { jwt } from 'hono/jwt'
const app = new Hono()

app.post('/update', async (c) => {
  const args = await c.req.formData()
  const avatarLocation = "./static/uploads" // + args.get('image')
  const type = args.get('type')
  const programId = Number(args.get('programId'))
  // const data = fs.readFileSync(avatarLocation)
  const cookieMe = getCookie(c, 'me')
  let me
  if (cookieMe) {
    me = JSON.parse(cookieMe)
  }
  const sewadarId = me?.id
  // ProgramID: id, ProgramCategory: category, ProgramLocation: location, ProgramStartDate: startDate, ProgramCompDate: compDate, ProgramBy: by, ProgramAdmin: admin


  // fs.writeFileSync(`./static/uploads/${programId}/${sewadarId}/${type}.png`, data)
  // fs.unlinkSync(avatarLocation)
  return c.json(`./static/uploads/${programId}/${sewadarId}/${type}.png`)
})

app.post('/save-avatar', async (c) => {
  const args = await c.req.formData();
  const file = args.get('image');
  const type = args.get('type');

  if (!file) {
    return c.json({ error: 'No file provided' }, 400);
  }

  const buffer = await file.arrayBuffer()
  const fileContent = Buffer.from(buffer);       // 

  fs.mkdirSync('./static/uploads/avatar', { recursive: true });
  fs.writeFileSync(`./static/uploads/avatar/${type}.png`, fileContent);

  return c.json({ filePath: `./static/uploads/avatar/${type}.png` });
})

app.post('/update-avatar', async (c) => {
  const args = await c.req.formData()
  const imageName = args.get('image')
  const avatarLocation = "./static" + imageName
  const type = args.get('type')
  const data = fs.readFileSync(avatarLocation)
  fs.writeFileSync(`./static/uploads/avatar/${type}.png`, data)
  fs.unlinkSync(avatarLocation)
  return c.json(`./static/uploads/avatar/${type}.png`)
})

app.post('/save', async (c) => {
  const args = await c.req.formData()
  const file = args.get('image')
  const type = args.get('type')
  const tokenNo = args.get('token_no')

  const cookieMe = getCookie(c, 'me')
  let me
  if (cookieMe) {
    me = JSON.parse(cookieMe)
  }
  const sewadarId = me.id
  // ProgramID: id, ProgramCategory: category, ProgramLocation: location, ProgramStartDate: startDate, ProgramCompDate: compDate, ProgramBy: by, ProgramAdmin: admin
  const programData = (await db.select().from(ProgramInfo).where(eq(ProgramInfo.Active, true)).limit(1))[0]
  const programId = programData.ProgramID

  if (!file) {
    return c.json({ error: 'No file provided' }, 400);
  }

  const buffer = await file.arrayBuffer()
  const fileContent = Buffer.from(buffer);       // 

  const compressedBuffer = await sharp(fileContent)
    .resize({ width: 700, height: 700, fit: 'inside' })
    .png({ quality: 80 })
    .toBuffer();

  fs.mkdirSync(`./static/uploads/${programId}/${sewadarId}/${tokenNo}`, { recursive: true });
  fs.writeFileSync(`./static/uploads/${programId}/${sewadarId}/${tokenNo}/${type}.png`, compressedBuffer);
  return c.json({ filepath: `/${programId}/${sewadarId}/${tokenNo}/${type}.png` });
})

export default app

