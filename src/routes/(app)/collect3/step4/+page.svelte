<script lang="ts">
	import { page } from '$app/stores'
	import { onMount } from 'svelte'

	let QR = $state()
	let queryParam = ''
	onMount(async () => {
		const QRModule = await import('./QrScan.svelte')
		QR = QRModule.default
		const unsubscribe = page.subscribe(($page) => {
			queryParam = $page.url.searchParams.get('message') || ''
		})
	})

	if (queryParam != '') {
		queryParam = ''
		alert(queryParam)
	}
</script>

<div>
	<h1 class="mb-2 text-xl font-bold text-blue-500">Scan Token QR</h1>

	<div>
		<QR />

		<!-- <input bind:value={data.TokenNo} placeholder="Enter Token No" /> -->

		<!-- <button on:click={nextStep}>Finish</button> -->
	</div>
</div>
