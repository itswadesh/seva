<script>
	import { collectionstore, updateStore } from '$lib/store/collectionStore'
	import { goto } from '$app/navigation'
	import Button from '$lib/components/ui/button/button.svelte'
	import ItemsForm from './itemsForm.svelte'

	let data = {
		Mobiles: 0,
		Charger: 0,
		EarPhone: 0,
		EarPod: 0,
		SmartWatch: 0,
		Laptop: 0,
		Bag: 0,
		Others: 0
	}

	function nextStep() {
		// Update dataStore with the collected data
		updateStore(data)
		goto('/collect3/step3')
	}
</script>

<div>
	<h1 class="mb-2 text-xl font-bold text-blue-500">Enter Item Details :</h1>

	<!-- <input bind:value={data.Charger} placeholder="Charger" />
    
    <input bind:value={data.EarPhone} placeholder="Earphone" /> -->

	<!-- <form on:submit|preventDefault={nextStep}> -->

	<ItemsForm {data} />

	<!-- <Button type="submit" class="w-full" variant="secondary"  >Next</Button> -->

	<!-- </form> -->
</div>
