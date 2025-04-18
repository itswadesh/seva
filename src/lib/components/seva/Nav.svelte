<script>
	// import axios from 'axios'
	import { Home } from 'radix-icons-svelte'
	// import { toast } from 'svelte-sonner'
	// import Button from '$lib/components/misiki/button/button.svelte'
	// import { getContext } from 'svelte'
	// import { goto } from '$app/navigation'
	// const userStore = getContext('user')
	import { page } from '$app/state'
	/** @type {{programData: any}} */
	let { programData } = $props()
	// import logoBlack from '$lib/assets/logo-black.png';
	// import logoWhite from '$lib/assets/logo-white.png';

	// let isLoading = false
	// import { getUserState } from '$lib/user.svelte'
	// const userStore = getUserState()
	const me = $derived(JSON.parse(page.data.me || '{}'))
</script>

<nav class="sticky inset-x-0 top-0 z-40 border-b bg-white p-3">
	<div class="flex h-12 items-center justify-between">
		<div
			class="h-full items-center {programData?.ProgramCategory == 'LIVE'
				? 'bg-green-500'
				: 'bg-red-500'} p-1 px-3 text-3xl font-bold text-white"
		>
			{programData?.ProgramCategory}
		</div>
		<div
			class="h-full w-full items-center bg-green-200 p-1 text-center text-4xl font-bold text-red-500"
		>
			# {page.url.searchParams.get('token_no')}
		</div>
		<a
			href="/"
			class="block flex w-24 items-center justify-center border bg-orange-200 px-4 py-3 pr-2 text-center text-center"
		>
			<Home class="h-6 w-6" />
		</a>
	</div>

	<div class="flex items-center">
		<div class="w-48 px-1 pt-2 text-xl font-bold text-blue-500">{me.module}-{me.role}</div>

		<div class="w-full truncate px-1 pt-2 text-right text-xl font-bold text-gray-600">
			[{me?.id}] {me?.name}
		</div>
		<!-- <Button variant="link" onclick={logout} class="ml-3 pt-4">Logout</Button> -->
	</div>
</nav>
