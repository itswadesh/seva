import { db } from '$lib/db/server';
import { Complaints } from '$lib/db/schema';

export const load = async () => {
	const result = await db.select().from(Complaints);
	return {
		result
	};
};

export const _handleSubmit = async (username,password) => {

	try{
		const newData = await db.select().from("ClientProfile").where("Sewadar_ID", username).where("MobileNo", password)
		console.log(newData);
		return newData;
	} catch (e) {
		console.log(e);
	}
};