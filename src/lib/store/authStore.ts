import { writable } from 'svelte/store'

export const authStore = writable([])

export const getAuthFromStore = async ({ }) => {
	let me = {}
	authStore.subscribe((value) => {
		if (value && Object.values(value)?.length) {
			me = value
		}
	})
}

export const updateAuthStore = async (data) => {
	authStore.update((u) => data)
	return true
}
