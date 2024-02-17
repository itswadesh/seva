import { pgTable, serial, text, boolean, integer, timestamp, real } from 'drizzle-orm/pg-core';

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
});

export const SangatData = pgTable('SangatData', {
    ID: serial('ID').primaryKey(),
    DuplicateToken: text('DuplicateToken'),
    TokenNo: text('TokenNo'),
    Module: text('Module'),
    Collect_SewadarID: text('Collect_SewadarID'),
    Collect_SewadarUK: integer('Collect_SewadarUK'),
    Collect_SewadarName: text('Collect_SewadarName'),
    GiveBack_SewadarID: text('GiveBack_SewadarID'),
    GiveBack_SewadarUK: integer('GiveBack_SewadarUK'),
    GiveBack_SewadarName: text('GiveBack_SewadarName'),
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
    CollectSangatFaceImage: text('CollectSangatFaceImage'),
    GiveBackSangatFaceImage: text('GiveBackSangatFaceImage'),
    ItemsImageFront: text('ItemsImageFront'),
    ItemsImageBack: text('ItemsImageBack'),
    Collet_DT: timestamp('Collet_DT'),
    GiveBackStatus: text('GiveBackStatus'),
    GiveBackDT: timestamp('GiveBackDT'),
    DisputeReasonID: integer('DisputeReasonID'),
    DisputeReason: text('DisputeReason'),
    DeviceID_Client: text('DeviceID_Client'),
    AdminHold: boolean('AdminHold'),
    AdminHoldReason: text('AdminHoldReason'),
    AdminHold_RequestedBy: text('AdminHold_RequestedBy'),
    Validation: text('Validation'),
    ValidationDT: timestamp('ValidationDT'),
    ErrorReason: text('ErrorReason')
});

export const ProgramInfo = pgTable('ProgramInfo', {
    ProgramID: serial('ProgramID').primaryKey(),
    ProgramCategory: text('ProgramCategory'),
    ProgramLocation: text('ProgramLocation'),
    ProgramStartDate: timestamp('ProgramStartDate'),
    ProgramCompDate: timestamp('ProgramCompDate'),
    ProgramBy: text('ProgramBy'),
    Active: boolean('Active'),
    ProgramValidity: timestamp('ProgramValidity'),
    ProgramAdmin: text('ProgramAdmin')
});

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
    Bag: boolean('Bag')
});

export const Complaints = pgTable('complaints', {
	id: serial('id').primaryKey(),
	pbno: text('pbno').notNull(),
	comment: text('comment')
});
