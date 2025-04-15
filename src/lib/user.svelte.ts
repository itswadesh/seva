import { goto } from '$app/navigation'
import axios from 'axios'
import { getContext, onDestroy, onMount, setContext } from 'svelte'
import { toast } from 'svelte-sonner'

export class UserState {
	isLoading = false
	me = $state<any>({ uid: 0, name: 0, phone: 0, avatar: '' })

	constructor() { }

	async updateMe(user: any) {
		this.me = user
	}
	async login(user: any) {
		try {
			this.isLoading = true
			const me = await axios.post('/api/auth/login', user)
			if (!me.data.sid) {
				this.me = {}
				toast.error(me.data.message)
				return
			}
			this.me = me.data
			goto('/')
		} catch (e) {
			this.me = {}
			toast.error(e.response.data)
		} finally {
			this.isLoading = false
		}
	}

	async signup(user: any) {
		try {
			this.isLoading = true
			const userDataRes = await axios.post('/api/auth/signup', user)
			if (userDataRes.data.status == 400) {
				return toast.error(userDataRes.data.message)
			}
			this.me = userDataRes.data[0]
			goto(`/auth/signup/success?id=${userDataRes.data[0]?.id}`)
		} catch (e) {
			toast.error(e?.toString())
			return
		} finally {
			this.isLoading = false
		}
	}

	async checkExistingProfile({ phone, aadhaarNo }: { phone: string, aadhaarNo: string }) {
		this.isLoading = true
		try {
			const res = await axios.post('/api/auth/check-user-exists', { phone, aadhaarNo })
			return res.data
		} catch (e) {
			toast.error(e.response.data)
		} finally {
			this.isLoading = false
		}
	}

	async logout() {
		this.isLoading = true
		try {
			await axios.post('/api/auth/logout')
			this.me = {}
			goto('/auth/login')
		} catch (e) {
			toast.error(e.response.data)
		} finally {
			this.isLoading = false
		}
	}
}

const USER_KEY = Symbol('USER')

export function setUserState() {
	return setContext(USER_KEY, new UserState())
}

export function getUserState() {
	return getContext<ReturnType<typeof setUserState>>(USER_KEY)
}
