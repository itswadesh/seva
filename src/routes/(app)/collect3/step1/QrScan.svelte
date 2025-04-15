<script lang="ts">
	import { onMount } from 'svelte'
	import jsQR from 'jsqr'
	import { goto } from '$app/navigation'
	import { StepState } from '$lib/steps.svelte'
	import { getStepState } from '$lib/steps.svelte'
	import { page } from '$app/state'
	import { redirect } from '@sveltejs/kit'
	const stepState = getStepState()
	let videoElement: any = $state()
	let canvasElement: any = $state()
	let scanning = $state(false)
	let error = $state('')

	let queryParam = $state('')
	onMount(async () => {
		queryParam = page.url.searchParams.get('message') || ''
		if (queryParam != '') {
			alert(queryParam)
			queryParam = ''
			error = queryParam
			await startCamera()
		} else {
			await startCamera()
		}
	})

	async function startCamera() {
		try {
			if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
				const stream = await navigator.mediaDevices.getUserMedia({
					video: { facingMode: 'environment' }
				})
				videoElement.srcObject = stream
				await new Promise((resolve) => {
					videoElement.onloadedmetadata = resolve
				})
				videoElement.play()
				scanning = true
				scanLoop()
			} else {
				error = 'Camera access is not supported in this browser.'
				console.error(error)
			}
		} catch (e) {
			console.error('Error accessing camera:', e)
			error = e.message
		}
	}

	async function scanLoop() {
		if (!videoElement) return
		if (!scanning) return
		canvasElement.width = videoElement.videoWidth
		canvasElement.height = videoElement.videoHeight
		canvasElement.getContext('2d').drawImage(videoElement, 0, 0)
		const imageData = canvasElement
			.getContext('2d')
			.getImageData(0, 0, canvasElement.width, canvasElement.height)
		const code = jsQR(imageData.data, imageData.width, imageData.height)
		if (code?.data) {
			const data = { TokenNo: code.data }
			stepState.updateTokenNo(code.data)
			stopScan()
			// goto(`/collect3/check-token?token_no=${data.TokenNo || ''}`, {
			// 	replaceState: true
			// })
			// const tokenNo = page.url.searchParams.get('token_no')
			const response = await fetch(`/api/sangat/check-token`, {
				method: 'POST',
				body: JSON.stringify({ tokenNo: data.TokenNo })
			})
			const isExist = await response.json()
			if (isExist) {
				goto('/collect3/invalid-token', { replaceState: true })
			} else {
				goto(`/collect3/step2?token_no=${data.TokenNo}`, { replaceState: true })
			}
			// Stop scanning once a QR code is detected
			// scanning = false;
		}
		requestAnimationFrame(scanLoop)
	}

	function stopScan() {
		scanning = false
		videoElement.srcObject.getTracks().forEach((track) => track.stop())
	}
</script>

<div>
	{#if error}
		<p>{error}</p>
	{/if}
	<video bind:this={videoElement}></video>
	<canvas style="display: none;" bind:this={canvasElement}></canvas>
	<!-- <button on:click={stopScan}>Stop Scanning</button> -->
</div>

<style>
	video {
		width: 100%;
		max-width: 600px;
		height: auto;
	}
</style>
