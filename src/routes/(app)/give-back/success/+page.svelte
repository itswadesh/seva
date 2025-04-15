<script lang="ts">
	import { page } from '$app/state'
	import Button from '$lib/components/ui/button/button.svelte'
	import { goto } from '$app/navigation'
</script>

<div class="bg-green-100 px-4 py-16 text-center text-3xl font-bold text-green-500">
	<h1 class="h-16">{page.url.searchParams.get('message') || 'Token Issued.'}</h1>
	<Button
		class="mt-12 w-full"
		onclick={() => {
			goto('/give-back')
		}}>Start new</Button
	>
</div>
