import { pgTable, serial, text } from 'drizzle-orm/pg-core';

export const Complaints = pgTable('complaints', {
	id: serial('id').primaryKey(),
	pbno: text('pbno').notNull(),
	comment: text('comment')
});
