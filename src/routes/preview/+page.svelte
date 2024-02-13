<script>
	import { browser } from '$app/environment';
	import Button from '$lib/components/ui/button/button.svelte';
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
<div class="flex justify-center">
	<h1 class="text-xl font-bold">List of Items</h1>
</div>

<ul>
  {#each Object.entries(formData) as [key, value]}
    <li>{key}: {value}</li>
  {/each}
</ul>

<Button class="w-full mt-4" on:click={submitData}>Submit</Button>
