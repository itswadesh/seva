<script>
	import Button from '$lib/components/ui/button/button.svelte'
	import { goto } from '$app/navigation'
</script>

<div class="bg-red-100 p-16 text-center text-3xl font-bold text-red-500">
	<h1 class="h-16">Token NOT Issued!</h1>
	<Button
		class="w-full"
		onclick={() => {
			goto('/give-back')
		}}>Try again</Button
	>
</div>
