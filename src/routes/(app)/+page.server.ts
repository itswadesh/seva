import { ClientProfile } from '$lib/db/schema'
import { db } from '$lib/db'
import { eq, and } from 'drizzle-orm'
import { fail, type Actions, redirect } from '@sveltejs/kit'
import { formSchema } from '../loginSchema'
import { superValidate } from 'sveltekit-superforms/server'

let isLogged = false

export const load = async () => {
	if (!isLogged) {
		// redirect(307, '/auth/login')
	}
	// redirect(307, '/collect3/step1')
	return {
		form: await superValidate(formSchema),
		islogged: isLogged
	}
}

export const actions = {
	default: async ({ request }) => {
		// default: async (event) => {
		// 	const form = await superValidate(event, formSchema)

		// 	if (!form.valid) {
		// 		return fail(400, {
		// 			form
		// 		})
		// 	}

		const data = await request.formData()
		const form = Object.fromEntries(data)

		// const newData = await db.insert(ClientProfile).values({ Sewadar_ID: form.data.username, password: form.data.password});

		const checkLoggedin = await db
			.select()
			.from(ClientProfile)
			.where(
				and(eq(ClientProfile.Sewadar_ID, form.email), eq(ClientProfile.password, form.password))
			)

		if (checkLoggedin.length > 0) {
			isLogged = true
			// redirect(307, '/collect3/step1')
		} else {
			return fail(400, {
				form
			})
		}
	}
}
