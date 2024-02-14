<script>
	import { goto } from '$app/navigation';
	import Button from '$lib/components/ui/button/button.svelte';
	import { collectionstore, updateStore } from '$lib/store/collectionStore';
	import ItemsForm from './itemsForm.svelte';

	let data = {};
	function nextStep() {
		// Update dataStore with the collected data
		updateStore(data);
		goto('/collect3/step3');
	}
</script>

<div>
	<h1 class="mb-10 text-center text-xl font-bold underline underline-offset-8">
		Enter Item Details
	</h1>

	<!-- <input bind:value={data.Charger} placeholder="Charger" />
    
    <input bind:value={data.EarPhone} placeholder="Earphone" /> -->

	<!-- <form on:submit|preventDefault={nextStep}> -->

	<ItemsForm {data} />

	<!-- <Button type="submit" class="w-full" variant="secondary"  >Next</Button> -->

	<!-- </form> -->
</div>
