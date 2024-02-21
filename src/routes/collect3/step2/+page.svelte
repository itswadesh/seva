<script>
	import { collectionstore, updateStore } from '$lib/store/collectionStore';
	import { goto } from '$app/navigation';
	import Button from '$lib/components/ui/button/button.svelte';
	import ItemsForm from './itemsForm.svelte';

	let data = {
		Bag: 0,
		Charger: 0,
		EarPhone: 0,
		EarPod: 0,
		Laptop: 0,
		Mobiles: 0,
		Others: 0,
		SmartWatch: 0
	};

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
