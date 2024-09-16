/* eslint-disable @typescript-eslint/no-explicit-any */
import { ProgramInfo, SangatData } from '$lib/db/schema'
import { db } from '$lib/db/server'
import { fail } from '@sveltejs/kit'
import type { Actions } from './$types'
import { eq, sql } from 'drizzle-orm'


const updateChangeImageSaved = async ({ tokenNo, image, programId }) => {
	const formData = new FormData()
	formData.append('image', image)
	const type = tokenNo
	formData.append('type', type)
	formData.append('programId', programId?.toString())
	const res = await fetch('/api/update/images', {
		method: 'POST',
		body: formData
	})
	const apiData = await res.json()
	return apiData
}


export const actions: Actions = {
	async default(event) {
		const items = Object.fromEntries(await event.request.formData())

		console.log('items', items)
		const programData = await db.select().from(ProgramInfo).where(eq(ProgramInfo.Active, true)).limit(1)
		const programId = programData[0].ProgramID
		// update immae based on the form data and the token no
		let { CollectSangatFaceImage, ItemsImageBack, ItemsImageFront } = items
		const tokenNo = items.TokenNo
		CollectSangatFaceImage = await updateChangeImageSaved({ tokenNo: `${tokenNo}_Face`, image: CollectSangatFaceImage, programId })
		ItemsImageBack = await updateChangeImageSaved({ tokenNo: `${tokenNo}_Back`, image: ItemsImageBack, programId })
		ItemsImageFront = await updateChangeImageSaved({ tokenNo: `${tokenNo}_Front`, image: ItemsImageFront, programId })

		// const q = `SELECT * FROM SangatData WHERE TokenNo = '${items?.TokenNo}' AND ProgramID = ${programId}`
		// const CheckTokenAndProgramId = await db.execute(sql.raw(q))

		// if (CheckTokenAndProgramId.length > 0) {

		// }

		try {
			const newData = await db.insert(SangatData).values({
				TokenNo: items?.TokenNo,
				ProgramID: programId,
				Collect_SewadarID: items?.Collect_SewadarID,
				Collect_SewadarName: items?.Collect_SewadarName,
				Mobiles: +items?.Mobiles,
				EarPhone: +items?.EarPhone,
				EarPod: +items?.EarPod,
				PowerBank: +items?.PowerBank,
				Charger: +items?.Charger,
				SmartWatch: +items?.SmartWatch,
				Others: +items?.Others,
				TotalItems: +items?.TotalItems,
				CollectSangatFaceImage: CollectSangatFaceImage, //items?.CollectSangatFaceImage,
				ItemsImageBack: ItemsImageBack, //items?.ItemsImageBack,
				ItemsImageFront: ItemsImageFront, //items?.ItemsImageFront
			})
			console.log('data inserted', newData)
			return newData
		} catch (e: any) {
			console.error('Error inserting data:', e)
			fail(e.status, { message: e.body?.message })
		}
	}
}
