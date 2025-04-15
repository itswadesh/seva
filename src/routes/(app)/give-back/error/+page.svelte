<script lang="ts">
	import { page } from '$app/state'
	import Button from '$lib/components/ui/button/button.svelte'
	import { goto } from '$app/navigation'
</script>

<div class="bg-red-100 px-4 py-16 text-center text-3xl font-bold text-red-500">
	<h1 class="h-16">{page.url.searchParams.get('message') || 'Token NOT Issued!'}</h1>
	<Button
		class="mt-12 w-full"
		onclick={() => {
			goto('/give-back')
		}}>Try again</Button
	>
</div>
