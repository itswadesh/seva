<script>
	import { browser } from '$app/environment';
	import { collectionstore } from '$lib/store/collectionStore';
	import { onMount } from 'svelte';
  
  let formData ={}
  function submitData() {
  }
  
	onMount(() => {
		if (browser) {
		 	collectionstore.subscribe((value) => {
				if (value) {
          formData=value
        }
			});
		}
	});

</script>

<h1>Item Details</h1>

<p>Review your data:</p>
<ul>
  {#each Object.entries(formData) as [key, value]}
    <li>{key}: {value}</li>
  {/each}
</ul>

<button on:click={submitData}>Submit</button>
