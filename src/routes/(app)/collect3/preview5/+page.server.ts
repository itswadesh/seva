/* eslint-disable @typescript-eslint/no-explicit-any */
import { ProgramInfo, SangatData } from '$lib/db/schema'
import { db } from '$lib/db'
import { fail, isRedirect } from '@sveltejs/kit'
import type { Actions } from './$types'
import { and, eq, sql } from 'drizzle-orm'
import { redirect } from '@sveltejs/kit'
import { goto } from '$app/navigation'


const updateChangeImageSaved = async ({ tokenNo, image, programId, fetch1 }: { tokenNo: string, image: string, programId: number, fetch1: any }) => {
	const formData = new FormData()
	formData.append('image', image)
	const type = tokenNo
	formData.append('type', type)
	formData.append('programId', programId?.toString())
	const res = await fetch1('/api/images/update', {
		method: 'POST',
		body: formData
	})
	const apiData = await res.json()
	return apiData
}

function formDataToJson(formData: any) {
	const jsonObject: any = {};
	formData.forEach((value: any, key: any) => {
		// Check if the key already exists in the JSON object (handles multiple values)
		if (jsonObject[key]) {
			// If it's not an array, convert it into an array
			if (!Array.isArray(jsonObject[key])) {
				jsonObject[key] = [jsonObject[key]];
			}
			// Add the new value to the array
			jsonObject[key].push(value);
		} else {
			jsonObject[key] = value;
		}
	});
	return jsonObject
}

export const actions: Actions = {
	async default(event) {
		const formData = await event.request.formData()

		const items = formDataToJson(formData)

		const programData = (await db.select().from(ProgramInfo).where(eq(ProgramInfo.Active, true)).limit(1))[0]
		const programId = programData.ProgramID
		// update immae based on the form data and the token no
		// let { CollectSangatFaceImage, ItemsImageBack, ItemsImageFront } = items
		// const tokenNo = items.TokenNo
		// CollectSangatFaceImage = await updateChangeImageSaved({ tokenNo: `${tokenNo}_Face`, image: CollectSangatFaceImage, programId, fetch1: event.fetch })
		// ItemsImageBack = await updateChangeImageSaved({ tokenNo: `${tokenNo}_Back`, image: ItemsImageBack, programId, fetch1: event.fetch })
		// ItemsImageFront = await updateChangeImageSaved({ tokenNo: `${tokenNo}_Front`, image: ItemsImageFront, programId, fetch1: event.fetch })

		// const q = `SELECT * FROM SangatData WHERE TokenNo = '${items?.TokenNo}' AND ProgramID = ${programId}`
		// const CheckTokenAndProgramId = await db.execute(sql.raw(q))

		// if (CheckTokenAndProgramId.length > 0) {

		// }

		try {
			const checkData = await db.select().from(SangatData).where(and(eq(SangatData.TokenNo, items?.TokenNo), eq(SangatData.ProgramID, programId))).limit(1)
			if (checkData.length > 0) {
				await db.update(SangatData).set({
					SubmissionCount: checkData[0].SubmissionCount + 1,
					Remark: items?.Collect_SewadarID
				}).where(eq(SangatData.TokenNo, items?.TokenNo))
				return redirect(307, 'This token number is already used. Please use another token.')
				// redirect(307, '/collect3/step4?message=This token number is already used. Please use another token.')
			} else {
				const postData = {
					TokenNo: items?.TokenNo,
					ProgramID: programId,
					Collect_SewadarID: items?.Collect_SewadarID,
					Collect_SewadarName: items?.Collect_SewadarName,
					Mobiles: +items?.Mobiles,
					EarPhone: +items?.EarPhone,
					Laptop: +items?.Laptop,
					Charger: +items?.Charger,
					SmartWatch: +items?.SmartWatch,
					Others: +items?.Others,
					Bag: +items?.Bag,
					TotalItems: +items?.Mobiles + +items?.EarPhone + +items?.Laptop + +items?.Charger + +items?.SmartWatch + +items?.Others + +items?.Bag,
					CollectSangatFaceImage: `/uploads/${programId}/${items?.Collect_SewadarID}/${items?.TokenNo}/face.png`,
					ItemsImageBack: `/uploads/${programId}/${items?.Collect_SewadarID}/${items?.TokenNo}/back.png`,
					ItemsImageFront: `/uploads/${programId}/${items?.Collect_SewadarID}/${items?.TokenNo}/front.png`,
					CollectDT: new Date(),
					GiveBackStatus: 'COLLECTED',
				}
				console.log(postData, 'postData')
				const newData = await db.insert(SangatData).values(postData)
				return newData
			}
		} catch (e: any) {
			console.error('Error inserting data:', e)
			fail(e.status, { message: e.body?.message })
		}
	}
}
