<script lang="ts">
	import { onMount } from 'svelte'

	let QR = $state()
	onMount(async () => {
		const QRModule = await import('./QrScan.svelte')
		QR = QRModule.default
	})
</script>

<div>
	<h1 class="mb-2 text-xl font-bold text-blue-500">Scan Token QR</h1>

	<div>
		<QR />

		<!-- <input bind:value={data.TokenNo} placeholder="Enter Token No" /> -->

		<!-- <button on:click={nextStep}>Finish</button> -->
	</div>
</div>
