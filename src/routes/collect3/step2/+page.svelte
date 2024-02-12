<script>
  import { goto } from '$app/navigation';
	import { collectionstore, updateStore } from '$lib/store/collectionStore';

let data={}
  function nextStep() {
    // Update dataStore with the collected data
    updateStore(data);
    goto('/collect3/step3');
  }
</script>

<h1>Step 2</h1>
<input bind:value={data.Charger} placeholder="Charger" />
<input bind:value={data.EarPhone} placeholder="Earphone" />
<button on:click={nextStep}>Next</button>
