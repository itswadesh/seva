import { SangatData } from '$lib/db/schema'
import { db } from '$lib/db'
import { collectionstore } from '$lib/store/collectionStore'
import type { Actions, PageServerLoad } from './$types'

let isScanned = false
export const load: PageServerLoad = async () => {
	return {
		isscanned: isScanned
	}
}

export const actions: Actions = {
	async default() {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		let items: any
		collectionstore.subscribe((value) => {
			items = value
		})

		try {
			const newData = await db.insert(SangatData).values({
				TokenNo: items?.TokenNo,
				Collect_SewadarID: items?.Collect_SewadarID,
				Collect_SewadarName: items?.Collect_SewadarName,
				Mobiles: items?.Mobiles,
				EarPhone: items?.EarPhone,
				EarPod: items?.EarPod,
				PowerBank: items?.PowerBank,
				Charger: items?.Charger,
				SmartWatch: items?.SmartWatch,
				Others: items?.Others,
				TotalItems: items?.TotalItems,
				CollectSangatFaceImage: items?.CollectSangatFaceImage,
				ItemsImageBack: items?.ItemsImageBack,
				ItemsImageFront: items?.ItemsImageFront
			})

			if (newData) {
				isScanned = true
			} else {
				isScanned = false // Reset to false if insertion fails
			}
		} catch (error) {
			console.error('Error inserting data:', error)
			isScanned = false // Reset to false if insertion fails
		}
	}
}
