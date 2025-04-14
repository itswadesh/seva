<script lang="ts">
	import { browser } from '$app/environment'
	import { onMount } from 'svelte'

	let QR = $state()
	let isLoading = $state(true)

	onMount(async () => {
		if (browser) {
			try {
				const QRModule = await import('./QrScan.svelte')
				QR = QRModule.default
			} catch (error) {
				console.error('Failed to load QR component:', error)
			} finally {
				isLoading = false
			}
		}
	})
</script>

<div>
	<h1 class="mb-2 text-xl font-bold text-blue-500">Scan Token QR</h1>

	<div>
		{#if isLoading}
			<p>Loading QR scanner...</p>
		{:else if QR}
			<QR />
		{:else}
			<p>Failed to load QR scanner</p>
		{/if}

		<!-- <input bind:value={data.TokenNo} placeholder="Enter Token No" /> -->

		<!-- <button on:click={nextStep}>Finish</button> -->
	</div>
</div>
