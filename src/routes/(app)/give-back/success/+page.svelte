<script lang="ts">
	import { page } from '$app/state'
	import Button from '$lib/components/ui/button/button.svelte'
	import { goto } from '$app/navigation'
</script>

<div
	class="flex h-full flex-col bg-green-100 px-4 py-16 text-center text-3xl font-bold text-green-500"
>
	<h1 class="h-full text-7xl">
		{page.url.searchParams.get('message') || `Approved # ${page.url.searchParams.get('token_no')}.`}
	</h1>
	<Button
		class="mt-12 w-full py-8 text-4xl"
		onclick={() => {
			goto('/give-back')
		}}
	>
		New Scan
	</Button>
</div>
