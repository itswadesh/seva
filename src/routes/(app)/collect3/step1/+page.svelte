<script lang="ts">
	import { preventDefault } from 'svelte/legacy'

	// import { collectionstore, updateStore } from '$lib/store/collectionStore'
	import { goto } from '$app/navigation'
	import Button from '$lib/components/ui/button/button.svelte'
	import Input from '$lib/components/ui/input/input.svelte'
	import { compressImage } from '$lib/utils'
	import { onMount } from 'svelte'
	import { browser } from '$app/environment'
	let capturedImageURI: string = $state()
	// let data: any = $state({})
	let loading = $state(false)
	import { getStepState } from '$lib/steps.svelte'
	const stepState = getStepState()
	// onMount(() => {
	// 	if (browser) {
	// 		collectionstore.subscribe((value) => {
	// 			data.CollectSangatFaceImage = value.CollectSangatFaceImage
	// 		})
	// 	}
	// })
	function nextStep() {
		goto('/collect3/step2')
	}

	const handleChangeImageSaved = async (e: any) => {
		const file = e.target.files[0] || {}
		const formData = new FormData()
		formData.append('image', file)
		const type = `Face-${Math.random()}`
		formData.append('type', type)
		const filePath1: any = await fetch('/api/save/images', {
			method: 'POST',
			body: formData
		})
		const apiData = await filePath1.json()
		// console.log('apiData', apiData)
		// Check if the file size is already below 100kb
		// if (file.size <= 100 * 1024) {
		// 	capturedImageURI = URL.createObjectURL(file)
		// 	updateStore({ CollectSangatFaceImage: capturedImageURI })
		// 	return
		// }

		// const compressedDataURL = await compressImage(file, 0.5) // Adjust quality as needed

		// Set the source of the compressed image
		capturedImageURI = apiData?.filepath

		// const updatedState = {
		// 	CollectSangatFaceImage: apiData?.filepath
		// }
		// console.log('compressed capturedImageURI', capturedImageURI, updatedState)
		stepState.updateSangatFaceImage(apiData?.filepath)
		// updateStore(updatedState)
	}
	$effect(() => {
		console.log($state.snapshot(stepState.CollectSangatFaceImage), $state.snapshot(stepState.items))
	})
</script>

<svelte:head>
	<title>Collect Sangat Face Image</title>
</svelte:head>

<div>
	<h1 class="mb-2 text-xl font-bold text-blue-500">Take Sangat Face Image</h1>

	<form onsubmit={preventDefault(nextStep)} class="flex flex-col gap-8">
		<div class="flex flex-col gap-4">
			<div class="flex w-full items-center justify-center">
				<label
					for="image-2"
					class="dark:hover:bg-bray-800 flex h-80 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
				>
					{#if capturedImageURI || stepState?.CollectSangatFaceImage}
						<img
							src={'/uploads' + (capturedImageURI || stepState.CollectSangatFaceImage)}
							alt=""
							class="h-full w-full object-contain object-center"
						/>
					{:else}
						<div class="flex flex-col items-center justify-center pb-6 pt-5">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								class="mb-2 h-8 w-8 text-gray-500 dark:text-gray-400"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
								/>
							</svg>

							<p class="text-2xl font-bold text-gray-500 dark:text-gray-400">
								Click to Take Picture
							</p>
						</div>
					{/if}

					<input
						id="image-2"
						type="file"
						name="image"
						accept="image/*"
						capture="environment"
						class="hidden"
						onchange={handleChangeImageSaved}
					/>
				</label>
			</div>
		</div>

		<Button
			type="submit"
			class="w-full"
			loading={stepState?.loading}
			disabled={!capturedImageURI && !stepState?.CollectSangatFaceImage}>Next Step</Button
		>
	</form>
</div>
