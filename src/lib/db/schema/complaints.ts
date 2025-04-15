import { pgTable, serial, date, text, boolean, integer, timestamp, real, varchar, primaryKey } from 'drizzle-orm/pg-core'

export const Complaints = pgTable('complaints', {
  id: serial('id').primaryKey(),
  pbno: varchar('pbno').notNull(),
  comment: varchar('comment'),
  createdAt: timestamp('created_at', { mode: 'string' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'string' }).defaultNow().notNull()
})
