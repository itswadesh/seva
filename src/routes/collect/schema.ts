import { z } from "zod";
export const formSchema = z.object({
    mobile: z.number().default(1),
    earphones: z.number().default(0),
    earpods: z.number().default(0),
    charger: z.number().default(0),
    smartwatch: z.number().default(0),
    others: z.number().default(0),
});
export type FormSchema = typeof formSchema;