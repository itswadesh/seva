<script lang="ts">
	import { goto } from '$app/navigation';
	import { updateStore } from '$lib/store/collectionStore';
	import Button from '$lib/components/ui/button/button.svelte';

	let capturedItemImageUrl1;
	let capturedItemImageUrl2;
	let data;

	const handleChangeItemImageSaved1 = (e: any) => {
		capturedItemImageUrl1 = URL.createObjectURL(e.target.files[0]);

		const updatedState = {
			ItemsImageFront: capturedItemImageUrl1
		};

		updateStore(updatedState);
	};

	const handleChangeItemImageSaved2 = (e: any) => {
		capturedItemImageUrl2 = URL.createObjectURL(e.target.files[0]);

		const updatedState = {
			ItemsImageBack: capturedItemImageUrl2
		};

		updateStore(updatedState);
	};
</script>

<form>
	<h1 class="mb-10 text-center text-xl font-bold underline underline-offset-8">
		Upload Products Photo
	</h1>

	<div class="flex flex-col gap-5">
		<div class="flex flex-col gap-2">
			<div class="flex w-full items-center justify-center">
				<label
					for="image-1"
					class="dark:hover:bg-bray-800 flex h-40 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
				>
					{#if capturedItemImageUrl1}
						<img
							src={capturedItemImageUrl1}
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

							<p class="text-sm font-semibold text-gray-500 dark:text-gray-400">
								Click to upload first image
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
						on:change={handleChangeItemImageSaved1}
					/>
				</label>
			</div>

			<div class="flex w-full items-center justify-center">
				<label
					for="image-2"
					class="dark:hover:bg-bray-800 flex h-40 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
				>
					{#if capturedItemImageUrl2}
						<img
							src={capturedItemImageUrl2}
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

							<p class="text-sm font-semibold text-gray-500 dark:text-gray-400">
								Click to upload second image
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
						on:change={handleChangeItemImageSaved2}
					/>
				</label>
			</div>
		</div>

		<Button variant="default" class="w-full" href="/collect3/step4">Proceed To Scan Token</Button>
	</div>
</form>
