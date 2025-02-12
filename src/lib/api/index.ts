import { Hono } from 'hono'
// import { db } from '../db'
import 'dotenv/config'
// import { ProgramInfo, ClientProfile } from '$lib/db/schema'
// import { setCookie, deleteCookie, getCookie } from 'hono/cookie'
import { prettyJSON } from 'hono/pretty-json'
// import { basicAuth } from 'hono/basic-auth'
// import { and, eq, ne } from 'drizzle-orm'
// import { HTTPException } from 'hono/http-exception'
// import { jwt } from 'hono/jwt'
import { logger } from 'hono/logger'
import { timing } from 'hono/timing'
// import fs from 'fs'
// import { Buffer } from 'buffer';
import auth from './routes/auth'
import admin from './routes/admin'
import images from './routes/images'

export const app = new Hono()
// app.use('/auth/*', jwt({ secret: 'it-is-very-secret' }))
app.use(prettyJSON())
app.use(logger())
app.use(timing());
app.notFound((c) => c.json({ message: 'Not Found', ok: false }, 404))
app.route('/auth', auth)
app.route('/images', images)
app.route('/admin', admin)

export const api = new Hono().route('/api', app)

export type Router = typeof app
