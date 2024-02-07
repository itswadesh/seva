import { superValidate } from "sveltekit-superforms/server";
import { formSchema } from "./schema";

export const load = async () => {
	return {
		form: await superValidate(formSchema),
	};
};
