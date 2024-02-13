import { db } from "$lib/db/server";
import {SangatData} from '$lib/db/schema'
export const load = async () => {

    const result = await  db.select().from(SangatData);
	return {
        result
	};
};
