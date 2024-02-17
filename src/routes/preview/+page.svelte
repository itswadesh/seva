<script>
	import { browser } from '$app/environment';
	import { collectionstore } from '$lib/store/collectionStore';
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { Reload } from 'radix-icons-svelte';
	import { toast } from 'svelte-sonner';
	import Button from '$lib/components/ui/button/button.svelte';

	let formData = {};
	let isLoading = false;

	function submitData() {}

	onMount(() => {
		if (browser) {
			collectionstore.subscribe((value) => {
				if (value) {
					formData = value;
				}
			});
		}
	});
</script>

<div>
	<h1 class="mb-10 text-center text-xl font-bold underline underline-offset-8">List of Items</h1>

	<form
		method="POST"
		class="flex flex-col gap-5"
		use:enhance={() => {
			isLoading = true;

			return async (result) => {
				// console.log('result', result);

				isLoading = false;

				if (result?.status === 200) {
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
		<ul class="m-0 flex list-none flex-col divide-y border p-0 text-sm">
			{#each Object.entries(formData) as [key, value], index}
				<li
					class="grid grid-cols-2 items-center
					{index % 2 === 0 ? 'bg-white' : 'bg-secondary'}"
				>
					<div class="col-span-1 flex items-center justify-between gap-2 p-2">
						<span>
							{key}
						</span>

						<span> : </span>
					</div>

					<div class="col-span-1 p-2 font-semibold">
						{value}
					</div>

					<input type="hidden" name={key} {value} />
				</li>
			{/each}
		</ul>

		<Button class="w-full" type="submit" disabled={isLoading}>
			{#if isLoading}
				<Reload class="mr-2 h-4 w-4 animate-spin" />
				Please wait
			{:else}
				Submit
			{/if}
		</Button>
	</form>
</div>
