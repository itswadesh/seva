import { SangatData } from '$lib/db/schema'
import { db } from '$lib/db/server'
import { collectionstore } from '$lib/store/collectionStore'
import type { Actions, PageServerLoad } from './$types'

export const load: PageServerLoad = async () => {

}

export const actions: Actions = {
    
	async default() {
        let items
		collectionstore.subscribe(value => {
			items = value
		}) 

		console.log(items)

		const previousData = await db.select().from(SangatData)

		console.log(previousData)

		const newData = await db.insert(SangatData).values({
			items 
		})

		console.log(newData)

	}
}