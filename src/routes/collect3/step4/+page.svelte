<script lang="ts">
  import { onMount } from 'svelte'
  
  let QR
  onMount(async() => {
    const QRModule = await import('./QrScan.svelte')
	  QR = QRModule.default
  })


</script>

<h1 class="flex justify-center border-b font-bold text-xl">Scan Token QR</h1>
<svelte:component	this="{QR}"/>

<!-- <input bind:value={data.TokenNo} placeholder="Enter Token No" /> -->
<!-- <button on:click={nextStep}>Finish</button> -->
