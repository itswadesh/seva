<script lang="ts">
	import { onMount } from 'svelte'
	import jsQR from 'jsqr'
	import { goto } from '$app/navigation'
	// import { updateStore } from '$lib/store/collectionStore'
	import { getStepState } from '$lib/steps.svelte'
	const stepState = getStepState()

	let videoElement: any = $state()
	let canvasElement: any = $state()
	let scanning = false

	onMount(async () => {
		await startCamera()
	})

	async function startCamera() {
		try {
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
		} catch (error) {
			console.error('Error accessing camera:', error)
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
			try {
				const response = await fetch(`/api/sangat/check-token`, {
					method: 'POST',
					body: JSON.stringify({ tokenNo: data.TokenNo })
				})
				const res = await response.json()
				if (res.message) {
					goto(`/give-back/error?message=${res.message}`, { replaceState: true })
				} else {
					goto(`/give-back/preview?token_no=${data.TokenNo}`, { replaceState: true })
				}
			} catch (e) {
				console.log(e)
				goto(`/give-back/error?message=${e.toString()}`, { replaceState: true })
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
