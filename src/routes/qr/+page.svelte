<script>
  import { onMount } from 'svelte'
  let QR
  onMount(async() => {
    const QRModule = await import('./QrScan.svelte')
	  QR = QRModule.default
  })
</script>

<svelte:component	this="{QR}"/>