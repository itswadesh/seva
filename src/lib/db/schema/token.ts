import { pgTable, serial, date, text, boolean, integer, timestamp, real, varchar, primaryKey } from 'drizzle-orm/pg-core'

export const TokenMaster = pgTable('TokenMaster', {
  ID: serial('ID').primaryKey(),
  RefID: integer('RefID'),
  ToKenNo: integer('ToKenNo'),
  Module: varchar('Module'),
  Panel: integer('Panel'),
  ColourCode: varchar('ColourCode'),
  PositionCode: varchar('PositionCode'),
  PositionCodeOld: varchar('PositionCodeOld'),
  Color: varchar('Color'),
  Print: boolean('Print'),
  Bag: boolean('Bag'),
  createdAt: timestamp('created_at', { mode: 'string' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'string' }).defaultNow().notNull()
})