<script>
	import { goto } from '$app/navigation';
	import { updateStore } from '$lib/store/collectionStore';
  import { onMount } from 'svelte'
	import ItemsForm from '../step2/itemsForm.svelte';
  
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

<h1>Scan Token QR</h1>
<svelte:component	this="{QR}"/>

<input bind:value={data.ID} placeholder="Enter Token No" />
<!-- <button on:click={nextStep}>Finish</button> -->
