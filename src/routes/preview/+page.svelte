<script>
	import { browser } from '$app/environment';
	import { collectionstore } from '$lib/store/collectionStore';
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { Reload } from 'radix-icons-svelte';
	import { toast } from 'svelte-sonner';
	import Button from '$lib/components/misiki/button/button.svelte';

	let formData = {};
	let loading = false;

	function submitData() {}

	onMount(() => {
		if (browser) {
			collectionstore.subscribe((value) => {
				if (value) {
					formData = value;
				}
			});

			console.log('formData', formData);
		}
	});
</script>

<div>
	<form
		method="POST"
		class="flex flex-col gap-5"
		use:enhance={() => {
			loading = true;

			return async (result) => {
				console.log('result', result);

				loading = false;

				if (result?.result?.status === 204) {
					goto('/collect3/step1');
				} else {
					toast('Something went wrong', {
						description: result?.error?.message,
						action: {
							label: 'Ok',
							onClick: () => console.log('Ok')
						}
					});
				}
			};
		}}
	>
		<div class="grid grid-cols-2">
			<img
				src={formData.CollectSangatFaceImage}
				alt="Sangat Face Missing"
				class="h-40 w-auto object-contain object-left"
			/>
			<div class="flex flex-col items-center">
				<img
					src={formData.ItemsImageFront}
					alt="Front Image Missing"
					class="h-20 w-auto object-contain object-left"
				/>
				<img
					src={formData.ItemsImageBack}
					alt="Back Image Missing"
					class="h-20 w-auto object-contain object-left"
				/>
			</div>
		</div>
		<div class="flex items-center gap-5 text-3xl font-bold">
			<div class="w-full bg-gray-200 p-4">Total Items</div>
			<div class="w-32 bg-gray-200 p-4 text-center">1</div>
		</div>
		<div
			class="flex items-center justify-center rounded-xl border-4 border-dashed border-black bg-gray-50 py-1 text-center text-7xl font-bold"
		>
			{formData.TokenNo}
		</div>
		<!-- <ul class="m-0 flex list-none flex-col divide-y border p-0 text-sm">
			{#each Object.entries(formData) as [key, value], index}
				<li
					class="grid grid-cols-2 items-center
					{index % 2 === 0 ? 'bg-white' : 'bg-secondary'}"
				>
					<div class="col-span-1 flex items-center justify-between gap-2 p-2">
						<span class="capitalize">
							{key.replace(/_/g, ' ').replace(/([a-z])([A-Z])/g, '$1 $2')}
						</span>

						<span> : </span>
					</div>

					<div class="col-span-1 p-2 font-semibold">
						{#if key === 'CollectSangatFaceImage' || key === 'ItemsImageBack' || key === 'ItemsImageFront'}
							<img src={value} alt={key} class="h-20 w-auto object-contain object-left" />
						{:else}
							{value || '-'}
						{/if}
					</div>

					<input type="hidden" name={key} {value} />
				</li>
			{/each}
		</ul> -->

		<Button type="submit" {loading}>Submit</Button>
	</form>
</div>
