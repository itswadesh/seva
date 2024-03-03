import { writable } from 'svelte/store'

// Define the initial state
const initialState = {
	Charger: 0,
	Collect_SewadarID: '',
	Collect_SewadarName: '',
	CollectSangatFaceImage: '',
	EarPhone: 0,
	EarPod: 0,
	ID: '',
	ItemsImageBack: '',
	ItemsImageFront: '',
	Mobiles: 0,
	Laptop: 0,
	Bag: 0,
	Others: 0,
	PowerBank: 0,
	SmartWatch: 0,
	TokenNo: 0,
	TotalItems: 0
}

// Create a writable store with the initial state
export const collectionstore = writable(initialState)

export function updateStore(updatedProperties: Partial<typeof initialState>) {
	collectionstore.update((currentState) => {
		// console.log(currentState, updatedProperties, { ...currentState, ...updatedProperties })
		return {
			...currentState,
			...updatedProperties
		}
	})
}

export function clearStore() {
	collectionstore.update(() => {
		return initialState
	})
}
