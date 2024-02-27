<script lang="ts">
	import { Button } from '$lib/components/misiki/button';
	import { goto } from '$app/navigation';
	import { Input } from '$lib/components/misiki/input';
	import { Plus, Minus } from 'radix-icons-svelte';
	import { updateStore } from '$lib/store/collectionStore';

	// export let form: SuperValidated<FormSchema>;
	export let data = {
		Mobiles: 0,
		Charger: 0,
		EarPhone: 0,
		EarPod: 0,
		SmartWatch: 0,
		Laptop: 0,
		Bag: 0,
		Others: 0
	};

	let loading = false;
	let total = 0;

	const getTotal = () => {
		total =
			+(data.Bag || 0) +
			+(data.Charger || 0) +
			+(data.EarPhone || 0) +
			+(data.EarPod || 0) +
			+(data.Laptop || 0) +
			+(data.Mobiles || 0) +
			+(data.Others || 0) +
			+(data.SmartWatch || 0);
	};

	function handleIncrement(item) {
		++data[item];
		getTotal();
	}

	function handleDecrement(item) {
		if (data[item] > 0) {
			--data[item];
			getTotal();
		}
	}

	const save = () => {
		loading = true;

		let total_no_of_items = 0;

		for (const key in data) {
			if (data[key] == undefined || data[key] == null || data[key] == '') {
				total_no_of_items += 0;
			} else total_no_of_items += Number(data[key]);
		}

		data.TotalItems = total_no_of_items;

		updateStore(data);

		loading = false;

		goto('/collect3/step3');
	};
</script>

<form method="POST" on:submit|preventDefault={save} class="flex flex-col gap-8">
	<div class="flex flex-col gap-4">
		{#each Object.entries(data) as [key, value] (key)}
			<div class="flex items-end gap-2">
				<div class="flex-1">
					<Input
						bind:value={data[key]}
						label={key.charAt(0).toUpperCase() + key.slice(1)}
						placeholder={`Enter the number of ${key.toLowerCase()}`}
						type="number"
						min="0"
						on:input={getTotal}
					/>
				</div>

				<div class="flex items-center gap-2">
					<Button
						variant="outline"
						class="rounded-full px-2.5"
						on:click={() => handleIncrement(key)}
					>
						<Plus class="h-5 w-5" />
					</Button>

					<Button
						variant="outline"
						class="rounded-full px-2.5"
						on:click={() => handleDecrement(key)}
					>
						<Minus class="h-5 w-5" />
					</Button>
				</div>
			</div>
		{/each}

		<hr />
		<div class="fixed bottom-0 left-0 w-full">
			<div class="flex items-center bg-black pl-4 font-bold text-white">
				Total Items :
				<span class="ml-1 mr-3 text-7xl">{total}</span>
				<button
					type="submit"
					{loading}
					disabled={loading || !total}
					class="ml-2 mr-4 w-full bg-white p-3 text-black"
				>
					Next Step
				</button>
			</div>
		</div>
	</div>
</form>
