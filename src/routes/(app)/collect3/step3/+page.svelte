<script lang="ts">
	import { goto } from '$app/navigation'
	import { collectionstore, updateStore } from '$lib/store/collectionStore'
	import { Button } from '$lib/components/misiki/button'
	import { compressImage } from '$lib/utils'
	import { onMount } from 'svelte'
	import { browser } from '$app/environment'
	import { getStepState } from '$lib/steps.svelte'
	const stepState = getStepState()

	let capturedItemImageUrl1
	let capturedItemImageUrl2
	let loading = false
	let data: any = {}

	onMount(() => {
		if (browser) {
			collectionstore.subscribe((value) => {
				data.ItemsImageFront = value.ItemsImageFront
				data.ItemsImageBack = value.ItemsImageBack
			})
		}
	})

	function nextStep(event) {
		event?.preventDefault()
		loading = true
		stepState.updateItemsImage(data)
		loading = false
		goto('/collect3/step4')
	}

	const handleChangeItemImageSaved1 = async (e: any) => {
		const file = e.target.files[0] || {}
		const formData = new FormData()
		formData.append('image', file)
		const type = `Front-${Math.random()}`
		formData.append('type', type)
		const filepath1: any = await fetch('/api/images/save', {
			method: 'POST',
			body: formData
		})
		const apiData = await filepath1.json()
		// Check if the file size is already below 100kb
		// if (file.size <= 100 * 1024) {
		// 	capturedItemImageUrl1 = URL.createObjectURL(file)
		// 	updateStore({ ItemsImageFront: capturedItemImageUrl1 })
		// 	return
		// }

		// const compressedDataURL = await compressImage(file, 0.5) // Adjust quality as needed

		// Set the source of the compressed image
		capturedItemImageUrl1 = apiData?.filepath

		// console.log('compressed capturedItemImageUrl1', capturedItemImageUrl1);

		const updatedState = {
			ItemsImageFront: apiData?.filepath
		}

		stepState.updateItemsImage(updatedState)
		// updateStore(updatedState)
	}

	const handleChangeItemImageSaved2 = async (e: any) => {
		const file = e.target.files[0] || {}
		const formData = new FormData()
		formData.append('image', file)
		const type = `Back-${Math.random()}`
		formData.append('type', type)
		const filepath1: any = await fetch('/api/images/save', {
			method: 'POST',
			body: formData
		})
		const apiData = await filepath1.json()
		// Check if the file size is already below 100kb
		// if (file.size <= 100 * 1024) {
		// 	capturedItemImageUrl2 = URL.createObjectURL(file)
		// 	updateStore({ ItemsImageBack: capturedItemImageUrl2 })
		// 	return
		// }

		// const compressedDataURL = await compressImage(file, 0.5) // Adjust quality as needed

		// Set the source of the compressed image
		capturedItemImageUrl2 = apiData?.filepath

		// console.log('compressed capturedItemImageUrl2', capturedItemImageUrl2);

		const updatedState = {
			ItemsImageBack: apiData?.filepath
		}
		stepState.updateItemsImage(updatedState)

		// updateStore(updatedState)
	}
</script>

<h1 class="mb-2 text-xl font-bold text-blue-500">Upload Items Picture</h1>

<form onsubmit={nextStep} class="flex flex-col gap-8">
	<div class="flex flex-col gap-4">
		<div class="flex w-full items-center justify-center">
			<label
				for="image-1"
				class="dark:hover:bg-bray-800 flex h-40 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
			>
				{#if capturedItemImageUrl1 || data.ItemsImageFront}
					<img
						src={'/uploads' + capturedItemImageUrl1 || '/uploads' + data.ItemsImageFront}
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
							Click to take Front Image
						</p>
					</div>
				{/if}

				<input
					id="image-1"
					type="file"
					name="image"
					accept="image/*"
					capture="environment"
					class="hidden"
					onchange={handleChangeItemImageSaved1}
				/>
			</label>
		</div>

		<div class="flex w-full items-center justify-center">
			<label
				for="image-2"
				class="dark:hover:bg-bray-800 flex h-40 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
			>
				{#if capturedItemImageUrl2 || data.ItemsImageBack}
					<img
						src={'/uploads' + capturedItemImageUrl2 || '/uploads' + data.ItemsImageBack}
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
							Click to take Back Image
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
					onchange={handleChangeItemImageSaved2}
				/>
			</label>
		</div>
	</div>

	<Button
		type="submit"
		class="w-full"
		{loading}
		disabled={!capturedItemImageUrl1 && !data.ItemsImageFront && !data.ItemsImageBack}
	>
		Proceed To Scan Token
	</Button>
</form>
