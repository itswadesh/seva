<script>
	import { browser } from '$app/environment';
	import { collectionstore } from '$lib/store/collectionStore';
	import { onMount } from 'svelte';
	import Button from '$lib/components/ui/button/button.svelte';

	let formData = {};

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

	<div class="flex flex-col gap-5">
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
				</li>
			{/each}
		</ul>

		<form method="POST" class="flex flex-col gap-5">
			<Button class="mt-4 w-full" type="submit">Submit</Button>
		</form>
	</div>
</div>
