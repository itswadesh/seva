<script lang="ts">
	import { preventDefault } from 'svelte/legacy'

	// import { collectionstore, updateStore } from '$lib/store/collectionStore'
	import { goto } from '$app/navigation'
	import Button from '$lib/components/ui/button/button.svelte'
	// import Input from '$lib/components/ui/input/input.svelte'
	// import { compressImage } from '$lib/utils'
	// import { onMount } from 'svelte'
	// import { browser } from '$app/environment'
	let capturedImageURI: string = $state()
	// let data: any = $state({})
	let loading = $state(false)
	import { getStepState } from '$lib/steps.svelte'
	import { Reload } from 'radix-icons-svelte'
	import { nanoid } from 'nanoid'
	import { page } from '$app/state'
	const stepState = getStepState()
	// onMount(() => {
	// 	if (browser) {
	// 		collectionstore.subscribe((value) => {
	// 			data.CollectSangatFaceImage = value.CollectSangatFaceImage
	// 		})
	// 	}
	// })

	function nextStep() {
		goto(`/collect3/step3?token_no=${page.url.searchParams.get('token_no') || ''}`)
	}

	const handleChangeImageSaved = async (e: any) => {
		const file = e.target.files[0] || {}
		const formData = new FormData()
		formData.append('image', file)
		formData.append('token_no', page.url.searchParams.get('token_no') || '')
		const type = 'face'
		formData.append('type', type)
		const filePath1: any = await fetch('/api/images/save', {
			method: 'POST',
			body: formData
		})
		const apiData = await filePath1.json()
		goto(`/collect3/step3?token_no=${page.url.searchParams.get('token_no') || ''}`, {
			replaceState: true
		})
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
		stepState.updateSangatFaceImage({
			tokenNo: page.url.searchParams.get('token_no') || '',
			filepath: apiData?.filepath
		})
		// updateStore(updatedState)
	}
	// $effect(() => {
	// 	console.log($state.snapshot(stepState.CollectSangatFaceImage), $state.snapshot(stepState.items))
	// })
	const me = $derived(JSON.parse(page.data.me || '{}'))
</script>

<svelte:head>
	<title>Collect Sangat Face Image</title>
</svelte:head>

<div>
	<h1 class="mb-2 text-xl font-bold text-blue-500">Take Sangat Face Image</h1>
	{page.data.me?.id}
	<form onsubmit={preventDefault(nextStep)} class="flex flex-col gap-8">
		<div class="flex flex-col gap-4">
			<div class="flex w-full items-center justify-center">
				<label
					for="image-2"
					class="dark:hover:bg-bray-800 flex h-80 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
				>
					{#if capturedImageURI}
						<img
							src={'/uploads' + capturedImageURI}
							alt=""
							class="h-full w-full object-contain object-center"
						/>
					{:else}
						{#await stepState.checkImageExists(`/${page.data?.programData?.ProgramID}/${me.id}/${page.url.searchParams.get('token_no') || ''}/face.png`)}
							<!-- Loading state -->
							<p>Checking image...</p>
						{:then exists}
							{#if exists}
								<img
									src={`/uploads/${page.data?.programData?.ProgramID}/${me.id}/${page.url.searchParams.get('token_no') || ''}/face.png`}
									alt=""
									class="h-full w-full object-contain object-center"
								/>
							{:else}
								<!-- Show upload prompt -->
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
										Click to take face image
									</p>
								</div>
							{/if}
						{/await}
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
		{#if stepState?.loading}
			<button class="w-full rounded border bg-gray-100 px-2 py-1 text-sm shadow-sm">
				<span class="sr-only">Loading</span>
				<Reload class="mr-2 h-4 w-4 animate-spin" />
				Please wait</button
			>
		{:else}
			<!-- {stepState.getSangatFaceImage({
				programId: page.data?.programData?.ProgramID,
				sewadarId: me.id,
				tokenNo: page.url.searchParams.get('token_no') || ''
			})} -->
			<Button type="submit" class="w-full" disabled={!capturedImageURI}>Next Step</Button>
		{/if}
	</form>
</div>
