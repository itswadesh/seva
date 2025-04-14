import { pgTable, serial, date, text, boolean, integer, timestamp, real, varchar, primaryKey } from 'drizzle-orm/pg-core'

export const SangatData = pgTable('SangatData', {
  ID: serial('ID'),
  DuplicateToken: varchar('DuplicateToken'),
  Active: boolean('Active'),
   TokenNo: varchar('TokenNo'),
  Module: varchar('Module').default("X"),
  Collect_SewadarID: varchar('Collect_SewadarID'),
  Collect_SewadarUK: integer('Collect_SewadarUK'),
  Collect_SewadarName: varchar('Collect_SewadarName'),
  GiveBack_SewadarID: varchar('GiveBack_SewadarID'),
  GiveBack_SewadarUK: integer('GiveBack_SewadarUK'),
  GiveBack_SewadarName: varchar('GiveBack_SewadarName'),
  ProgramID: integer('ProgramID'),
  Mobiles: integer('Mobiles'),
  EarPhone: integer('EarPhone'),
  // EarPod: integer('EarPod'),
  PowerBank: integer('PowerBank'),
  Charger: integer('Charger'),
  SmartWatch: integer('SmartWatch'),
  Laptop: integer('Laptop'),
  Others: integer('Others'),
  TotalItems: integer('TotalItems'),
  CollectSangatFaceImage: varchar('CollectSangatFaceImage'),
  GiveBackSangatFaceImage: varchar('GiveBackSangatFaceImage'),
  ItemsImageFront: varchar('ItemsImageFront'),
  ItemsImageBack: varchar('ItemsImageBack'),
  Collet_DT: timestamp('Collet_DT'),
  GiveBackStatus: varchar('GiveBackStatus'),
  GiveBackDT: timestamp('GiveBackDT'),
  DisputeReasonID: integer('DisputeReasonID'),
  DisputeReason: varchar('DisputeReason'),
  DeviceID_Client: varchar('DeviceID_Client'),
  AdminHold: boolean('AdminHold'),
  AdminHoldReason: varchar('AdminHoldReason'),
  AdminHold_RequestedBy: varchar('AdminHold_RequestedBy'),
  Validation: varchar('Validation'),
  ValidationDT: timestamp('ValidationDT'),
  ErrorReason: varchar('ErrorReason'),
  Remark: varchar('Remark'),
  SubmissionCount: integer('SubmissionCount').default(1),
  createdAt: timestamp('created_at', { mode: 'string' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'string' }).defaultNow().notNull()

});