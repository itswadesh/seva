import { pgTable, serial, date, text, boolean, integer, timestamp, real, varchar, primaryKey } from 'drizzle-orm/pg-core'


export const ProgramInfo = pgTable('ProgramInfo', {
  ProgramID: serial('ProgramID').primaryKey(),
  ProgramCategory: varchar('ProgramCategory'),
  ProgramLocation: varchar('ProgramLocation'),
  ProgramStartDate: date('ProgramStartDate'),
  ProgramCompDate: date('ProgramCompDate'),
  ProgramBy: varchar('ProgramBy'),
  Active: boolean('Active'),
  ProgramValidity: date('ProgramValidity'),
  ProgramAdmin: varchar('ProgramAdmin'),
  createdAt: timestamp('created_at', { mode: 'string' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'string' }).defaultNow().notNull()

})
