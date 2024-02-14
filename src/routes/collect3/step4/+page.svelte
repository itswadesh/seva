<script lang="ts">
	import { onMount } from 'svelte';

	let QR;
	onMount(async () => {
		const QRModule = await import('./QrScan.svelte');
		QR = QRModule.default;
	});
</script>

<div>
	<h1 class="mb-10 text-center text-xl font-bold underline underline-offset-8">Scan Token QR</h1>

	<div>
		<svelte:component this={QR} />

		<!-- <input bind:value={data.TokenNo} placeholder="Enter Token No" /> -->

		<!-- <button on:click={nextStep}>Finish</button> -->
	</div>
</div>
