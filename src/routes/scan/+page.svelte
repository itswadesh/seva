<script lang="ts">
	import { Button } from '$lib/components/ui/button'
	import { enhance } from '$app/forms'
	import { goto } from '$app/navigation'
	import { Html5Qrcode } from 'html5-qrcode'
	import { onMount } from 'svelte'
	import { updateStore } from '$lib/store/collectionStore'

	export let data

	let scanning = false
	let html5Qrcode: Html5Qrcode

	onMount(() => {
		if (data.isscanned) {
			goto('/collect')
		} else {
			initScanner()
		}
	})

	function initScanner() {
		html5Qrcode = new Html5Qrcode('reader')
		if (!data.isscanned) start()
	}

	function start() {
		html5Qrcode.start(
			{ facingMode: 'environment' }, // Use "environment" for the rear camera
			{
				fps: 10,
				qrbox: { width: 250, height: 250 }
			},
			onScanSuccess,
			onScanFailure
		)
		scanning = true
	}

	async function stop() {
		await html5Qrcode.stop()
		scanning = false
	}

	async function onScanSuccess(decodedText: any, decodedResult: any) {
		const updatedState = {
			TokenNo: decodedText
		}
		updateStore(updatedState)
		// console.log(decodedResult)
		stop()
		// console.log('decodedText', decodedText)
		// console.log('onsubmit')
		const form = document.getElementById('scan') as HTMLFormElement
		if (form) {
			form.submit()
		}
		data.isscanned = false
		// console.log('onsubmit done')
	}

	function onScanFailure(error: any) {
		console.warn(`Code scan error = ${error}`)
	}
</script>

<main>
	<reader id="reader" />
	{#if scanning}
		<Button variant="default" class="w-full" on:click={stop}>Stop</Button>
	{:else}
		<Button variant="default" class="w-full" on:click={start}>Start</Button>
	{/if}

	<form
		action="/scan"
		method="POST"
		id="scan"
		use:enhance={() => {
			return async (result) => {
				// console.log('result', result)
			}
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
