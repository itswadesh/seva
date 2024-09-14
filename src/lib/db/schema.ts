import { pgTable, serial, date, text, boolean, integer, timestamp, real, varchar, primaryKey } from 'drizzle-orm/pg-core'

// export const RoleEnum = pgEnum('Role', ['WINDOW', 'BACKUP'])

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
	ID: serial('ID'),
	DuplicateToken: varchar('DuplicateToken'),
	Active: boolean('Active'),
	ProgramId: integer('ProgramId'),
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
}, (table) => ({
	pk: primaryKey(table.ProgramID, table.TokenNo)
}));

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
	Module: varchar('Module'),
	Panel: integer('Panel'),
	ColourCode: varchar('ColourCode'),
	PositionCode: varchar('PositionCode'),
	PositionCodeOld: varchar('PositionCodeOld'),
	Color: varchar('Color'),
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
	pbno: varchar('pbno').notNull(),
	comment: varchar('comment'),
	createdAt: timestamp('created_at', {
		precision: 6,
		withTimezone: true,
	}).defaultNow(),
	updatedAt: timestamp('updated_at', {
		precision: 6,
		withTimezone: true,
	}).defaultNow(),
})
