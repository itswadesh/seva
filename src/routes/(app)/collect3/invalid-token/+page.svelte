<script>
	import Button from '$lib/components/ui/button/button.svelte'
	import { goto } from '$app/navigation'
</script>

<div class="bg-red-100 p-16 text-center text-3xl font-bold text-red-500">
	<h1 class="h-20">Token Already Issued!</h1>
	<Button
		class="w-full"
		onclick={() => {
			goto('/collect3/step1')
		}}>Try again</Button
	>
</div>
