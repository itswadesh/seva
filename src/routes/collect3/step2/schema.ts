import { z } from 'zod';
export const formSchema = z.object({
	mobile: z.string().default('1'),
	earphones: z.string().default('0'),
	earpods: z.string().default('0'),
	charger: z.string().default('0'),
	smartwatch: z.string().default('0'),
	others: z.string().default('0')
});
export type FormSchema = typeof formSchema;
