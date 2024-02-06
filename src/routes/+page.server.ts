import { db } from '$lib/db/server';
import { Complaints } from '$lib/db/schema';

export const load = async () => {
	const result = await db.select().from(Complaints);
	return {
		result
	};
};
