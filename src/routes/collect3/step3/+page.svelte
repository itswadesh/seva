<script>
	import { goto } from '$app/navigation';
	import { updateStore } from '$lib/store/collectionStore';
  import { onMount } from 'svelte'
  
  let data={}

  function nextStep() {
  //  updateStore(data);
    goto('/preview');
  }

  let QR
  onMount(async() => {
    const QRModule = await import('./QrScan.svelte')
	  QR = QRModule.default
  })


</script>

<h1>Step 3</h1>
<svelte:component	this="{QR}"/>

<input bind:value={data.Collect_SewadarID} placeholder="Enter SewadarID" />
<!-- <button on:click={nextStep}>Finish</button> -->
