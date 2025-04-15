import { pgTable, serial, date, text, boolean, integer, timestamp, real, varchar, primaryKey } from 'drizzle-orm/pg-core'

export const ClientProfile = pgTable('ClientProfile', {
  ID: serial('ID').primaryKey(),
  Pending_Approval: boolean('Pending_Approval').default(true),
  Sewadar_ID: varchar('Sewadar_ID'),
  Avatar: varchar('avatar'),
  FatherName: varchar('FatherName'),
  AadharNo: varchar('AadharNo').unique(),
  Qualification: varchar('Qualification'),
  password: varchar('password'),
  ProfileLevel: varchar('ProfileLevel'),
  Module: text('Module'),
  Role: varchar('Role'),
  Location: real('Location'),
  Name: varchar('Name'),
  Gender: text('Gender'),
  DOB: date('DOB'),
  ClientImage: varchar('ClientImage'),
  Centre: varchar('Centre'),
  MobileNo: varchar('MobileNo').unique(),
  Approved: boolean('Approved').default(false),
  ApprovedBy: varchar('ApprovedBy'),
  SevaPreference: varchar('SevaPreference'),
  SevaPreference1: varchar('SevaPreference1'),
  MobileAvailability: varchar('MobileAvailability'),
  Skills: varchar('Skills'),
  ApprovalDT: timestamp('ApprovalDT'),
  LastSigninDT: timestamp('LastSigninDT'),
  Active: boolean('Active').default(false),
  ActivatedAt: timestamp('ActivatedAt', {
    precision: 6,
    withTimezone: true,
  }),
  sid: varchar('sid'),
  createdAt: timestamp('created_at', { mode: 'string' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'string' }).defaultNow().notNull()

})
