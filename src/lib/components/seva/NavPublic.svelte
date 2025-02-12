<script>
	// import { goto } from '$app/navigation'
	// import axios from 'axios'
	import { Home } from 'radix-icons-svelte'
	// import Button from '$lib/components/misiki/button/button.svelte'
	// import { toast } from 'svelte-sonner'
	// import { getContext } from 'svelte'
	// const userStore = getContext('user')
	import { getUserState } from '$lib/user.svelte'
	const userStore = getUserState()
</script>

<nav class="sticky inset-x-0 top-0 z-40 flex items-center justify-between border-b bg-white p-3">
	<div class="flex h-12 items-center justify-between">
		<a href="/auth/login" class="ml-4 flex items-center justify-end pr-2 text-center">
			<Home class="h-6 w-6" />
		</a>
	</div>
	<div class="flex items-center">
		{#if userStore?.sid}
			Welcome {userStore?.name || ''}
			<!-- <Button variant="link" on:click={logout} class="ml-3">Logout</Button> -->
		{:else}
			<!-- <a href="/auth/signup" class=" px-1">SignUp</a>
			<a href="/auth/login" class=" truncate px-1 text-right text-gray-600">Login</a> -->
		{/if}
	</div>
</nav>
