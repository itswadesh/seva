<script>
	// import { toast } from '$lib/utils';
	import { enhance } from '$app/forms';
	import { collectionstore } from '$lib/store/collectionStore';
	import { Html5Qrcode } from 'html5-qrcode';
	import { onMount } from 'svelte';

	let scanning = false;

	let html5Qrcode;
	let getStoreValue;

	onMount(() => {
		initScanner();
		collectionstore.subscribe((value) => {
			getStoreValue = value;
		});
	});

	function initScanner() {
		html5Qrcode = new Html5Qrcode('reader');
		start();
	}

	function start() {
		html5Qrcode.start(
			{ facingMode: 'environment' },
			{
				fps: 10,
				qrbox: { width: 250, height: 250 }
			},
			onScanSuccess,
			onScanFailure
		);
		scanning = true;
	}

	async function stop() {
		await html5Qrcode.stop();
		scanning = false;
	}

	async function onScanSuccess(decodedText, decodedResult) {
		getStoreValue.TokenNo = decodedText;
		collectionstore.update(() => getStoreValue);
		console.log(decodedResult);
		stop();
		prompt(getStoreValue);

		const form = document.getElementById('scan');

		// Trigger the form submission
		if (form) form.submit();
	}

	function onScanFailure(error) {
		console.warn(`Code scan error = ${error}`);
	}
</script>

<main>
	<reader id="reader" />
	{#if scanning}
		<button on:click={stop}>stop</button>
	{:else}
		<button on:click={start}>start</button>
	{/if}

	<form
		action="/scan"
		method="POST"
		id="scan"
		use:enhance={() => {
			return async (result) => {
				console.log('result', result);
				// toast('Scaned successfully', 'success');
				// await invalidateAll()
			};
		}}
	></form>
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 20px;
	}
	reader {
		width: 100%;
		min-height: 500px;
		background-color: black;
	}
</style>
