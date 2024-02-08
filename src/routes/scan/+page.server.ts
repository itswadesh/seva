import { saveCollectedItems } from '$lib/services/SaveCollectedItems';
import type { Actions, PageServerLoad } from './$types'

export const load: PageServerLoad = async () => {

}

export const actions: Actions = {
	async default() {
		console.log('zzzzzzzzzzzzzzzzzz',);
		// saveCollectedItems()
	}
}