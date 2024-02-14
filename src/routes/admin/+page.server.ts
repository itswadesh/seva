import { db } from "$lib/db/server";
import {SangatData} from '$lib/db/schema'
import { desc } from "drizzle-orm";
export const load = async () => {

    const result = await db.select().from(SangatData).orderBy(desc(SangatData.ID)).limit(20);
    return {
        result
    };
};
