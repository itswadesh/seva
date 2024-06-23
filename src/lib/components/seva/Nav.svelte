<script>
	import axios from 'axios'
	import { Home } from 'radix-icons-svelte'
	import { toast } from 'svelte-sonner'
	import Button from '$lib/components/misiki/button/button.svelte'
	import { getContext } from 'svelte'
	import { goto } from '$app/navigation'
	const userStore = getContext('user')
	export let programData
	// import logoBlack from '$lib/assets/logo-black.png';
	// import logoWhite from '$lib/assets/logo-white.png';

	let isLoading = false
	async function logout() {
		isLoading = true
		try {
			await axios.post('/api/auth/logout')
			userStore.updateMe({})
			goto('/auth/login')
		} catch (e) {
			toast.error(e.response.data)
		} finally {
			isLoading = false
		}
	}
</script>

<nav class="sticky inset-x-0 top-0 z-40 border-b bg-white p-3">
	<div class="flex h-12 items-center justify-between">
		<div class="h-full items-center bg-red-500 p-1 px-3 text-3xl font-bold text-white">
			{programData[0]?.ProgramCategory}
		</div>
		<div
			class="h-full w-full items-center bg-green-200 p-1 text-center text-3xl font-bold text-green-500"
		>
			Collect
		</div>
		<a href="/" class="ml-4 flex items-center justify-end pr-2 text-center">
			<Home class="h-6 w-6" />
		</a>
	</div>

	<div class="flex items-center">
		<div class="w-24 px-1 pt-2 text-xl font-bold text-blue-500">A-W-1</div>
		<div class="w-full truncate px-1 pt-2 text-right text-xl font-bold text-gray-600">
			[{$userStore.me?.id}] {$userStore.me?.name}
		</div>
		<Button variant="link" on:click={logout} class="ml-3 pt-4">Logout</Button>
	</div>
</nav>
