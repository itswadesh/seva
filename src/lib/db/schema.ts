import { pgTable, serial, text, boolean, integer, timestamp, real, varchar } from 'drizzle-orm/pg-core'

export const ClientProfile = pgTable('ClientProfile', {
	ID: serial('ID').primaryKey(),
	Sewadar_ID: text('Sewadar_ID'),
	password: text('password'),
	ProfileLevel: text('ProfileLevel'),
	Module: text('Module'),
	Role: text('Role'),
	Location: real('Location'),
	Name: text('Name'),
	Gender: text('Gender'),
	DOB: timestamp('DOB'),
	ClientImage: text('ClientImage'),
	Centre: text('Centre'),
	MobileNo: real('MobileNo'),
	Approved: boolean('Approved'),
	ApprovedBy: text('ApprovedBy'),
	ApprovalDT: timestamp('ApprovalDT'),
	Active: boolean('Active'),
	createdAt: timestamp('created_at', {
		precision: 6,
		withTimezone: true,
	}).defaultNow(),
	updatedAt: timestamp('updated_at', {
		precision: 6,
		withTimezone: true,
	}).defaultNow(),
})

export const SangatData = pgTable('SangatData', {
	ID: serial('ID').primaryKey(),
	DuplicateToken: varchar('DuplicateToken'),
	TokenNo: varchar('TokenNo'),
	Module: varchar('Module'),
	Collect_SewadarID: varchar('Collect_SewadarID'),
	Collect_SewadarUK: integer('Collect_SewadarUK'),
	Collect_SewadarName: varchar('Collect_SewadarName'),
	GiveBack_SewadarID: varchar('GiveBack_SewadarID'),
	GiveBack_SewadarUK: integer('GiveBack_SewadarUK'),
	GiveBack_SewadarName: varchar('GiveBack_SewadarName'),
	ProgramID: integer('ProgramID'),
	Mobiles: integer('Mobiles'),
	EarPhone: integer('EarPhone'),
	EarPod: integer('EarPod'),
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
	createdAt: timestamp('created_at', {
		precision: 6,
		withTimezone: true,
	}).defaultNow(),
	updatedAt: timestamp('updated_at', {
		precision: 6,
		withTimezone: true,
	}).defaultNow(),
})

export const ProgramInfo = pgTable('ProgramInfo', {
	ProgramID: serial('ProgramID').primaryKey(),
	ProgramCategory: text('ProgramCategory'),
	ProgramLocation: text('ProgramLocation'),
	ProgramStartDate: timestamp('ProgramStartDate'),
	ProgramCompDate: timestamp('ProgramCompDate'),
	ProgramBy: text('ProgramBy'),
	Active: boolean('Active'),
	ProgramValidity: timestamp('ProgramValidity'),
	ProgramAdmin: text('ProgramAdmin'),
	createdAt: timestamp('created_at', {
		precision: 6,
		withTimezone: true,
	}).defaultNow(),
	updatedAt: timestamp('updated_at', {
		precision: 6,
		withTimezone: true,
	}).defaultNow(),
})

export const TokenMaster = pgTable('TokenMaster', {
	ID: serial('ID').primaryKey(),
	RefID: integer('RefID'),
	ToKenNo: integer('ToKenNo'),
	Module: text('Module'),
	Panel: integer('Panel'),
	ColourCode: text('ColourCode'),
	PositionCode: text('PositionCode'),
	PositionCodeOld: text('PositionCodeOld'),
	Color: text('Color'),
	Print: boolean('Print'),
	Bag: boolean('Bag'),
	createdAt: timestamp('created_at', {
		precision: 6,
		withTimezone: true,
	}).defaultNow(),
	updatedAt: timestamp('updated_at', {
		precision: 6,
		withTimezone: true,
	}).defaultNow(),
})

export const Complaints = pgTable('complaints', {
	id: serial('id').primaryKey(),
	pbno: text('pbno').notNull(),
	comment: text('comment'),
	createdAt: timestamp('created_at', {
		precision: 6,
		withTimezone: true,
	}).defaultNow(),
	updatedAt: timestamp('updated_at', {
		precision: 6,
		withTimezone: true,
	}).defaultNow(),
})
