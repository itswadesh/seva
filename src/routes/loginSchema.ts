import { z } from 'zod'
export const formSchema = z.object({
	username: z.string().min(3).max(20),
	password: z.string().min(3).max(100)
})
export type LoginFormSchema = typeof formSchema
