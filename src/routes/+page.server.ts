import { ClientProfile } from '$lib/db/schema';
import { db } from '$lib/db/server';
import { eq, and } from 'drizzle-orm';
import { fail, type Actions, redirect } from '@sveltejs/kit';
import { formSchema } from './loginSchema';
import { superValidate } from 'sveltekit-superforms/server';

let isLogged = false

export const load = async () => {
	return {
		form: await superValidate(formSchema),
		islogged: isLogged
	};
};


export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, formSchema);

		if (!form.valid) {
			return fail(400, {
				form,
			});
		}

		// const newData = await db.insert(ClientProfile).values({ Sewadar_ID: form.data.username, password: form.data.password});


		// console.log("data inserted" , newData);

		const checkLoggedin = await db.select().from(ClientProfile).where(
			and(
				eq(ClientProfile.Sewadar_ID, form.data.username),
				eq(ClientProfile.password, form.data.password)
			)
		)

		console.log("data fetche from DB", checkLoggedin);

		if (checkLoggedin.length > 0) {
			isLogged = true
			redirect(307, '/collect3/step1')
		}
	},
};
