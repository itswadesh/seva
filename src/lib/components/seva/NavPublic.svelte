<script>
	import { goto } from '$app/navigation'
	import axios from 'axios'
	import { Home } from 'radix-icons-svelte'
	import { toast } from 'svelte-sonner'
	import { getContext } from 'svelte'
	const userStore = getContext('user')

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

<nav class="sticky inset-x-0 top-0 z-40 flex items-center justify-between border-b bg-white p-3">
	<div class="flex h-12 items-center justify-between">
		<a href="/" class="ml-4 flex items-center justify-end pr-2 text-center">
			<Home class="h-6 w-6" />
		</a>
	</div>
	<div class="flex items-center">
		{#if $userStore.me?.sid}
			Welcome {$userStore.me.name || ''}
			<button on:click={logout}>Logout</button>
		{:else}
			<a href="/auth/signup" class=" px-1">SignUp</a>
			<a href="/auth/login" class=" truncate px-1 text-right text-gray-600">Login</a>
		{/if}
	</div>
</nav>
