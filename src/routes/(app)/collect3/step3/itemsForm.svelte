<script lang="ts">
	import { preventDefault } from 'svelte/legacy'

	import { Button } from '$lib/components/misiki/button'
	import { goto } from '$app/navigation'
	import { Input } from '$lib/components/misiki/input'
	import { Plus, Minus } from 'radix-icons-svelte'
	// import { updateStore, collectionstore } from '$lib/store/collectionStore'
	// import { onMount } from 'svelte'
	// import { browser } from '$app/environment'
	import { getStepState } from '$lib/steps.svelte'
	import { page } from '$app/state'
	const stepState = getStepState()
	// let loading = $state(false)

	function handleIncrement(item) {
		stepState.items[item] = +stepState.items[item] + 1
		stepState.updateItems(stepState.items)
	}

	function handleDecrement(item) {
		if (stepState.items[item] > 0) {
			stepState.items[item] = +stepState.items[item] - 1
			stepState.updateItems(stepState.items)
		}
	}

	const save = () => {
		loading = true

		// let total_no_of_items = 0

		// for (const key in data) {
		// 	if (data[key] == undefined || data[key] == null || data[key] == '') {
		// 		total_no_of_items += 0
		// 	} else total_no_of_items += Number(data[key])
		// }

		// data.TotalItems = total_no_of_items

		// stepState.update(data)
		// updateStore(data)

		loading = false

		goto(`/collect3/step4?token_no=${page.url.searchParams.get('token_no') || ''}`)
	}
	// $effect(() => {
	// 	console.log($state.snapshot(stepState.CollectSangatFaceImage), $state.snapshot(stepState.items))
	// })
</script>

<form method="POST" onsubmit={preventDefault(save)} class="flex flex-col gap-8">
	<div class="mb-16 flex flex-col gap-4">
		{#each Object.entries(stepState.items) as [key, value] (key)}
			<div class="flex items-end gap-2">
				<div class="flex-1">
					<Input
						class={stepState.items[key] > 0
							? 'border border-green-500 bg-green-50 text-xl font-bold text-green-500'
							: ''}
						bind:value={stepState.items[key]}
						label={key.charAt(0).toUpperCase() + key.slice(1)}
						placeholder={`Enter the number of ${key.toLowerCase()}`}
						type="number"
						min="0"
						oninput={stepState.total_items}
					/>
				</div>

				<div class="flex items-center gap-2">
					<Button
						variant="outline"
						class="rounded-full px-2.5"
						onclick={() => handleIncrement(key)}
					>
						<Plus class="h-5 w-5" />
					</Button>

					<Button
						variant="outline"
						class="rounded-full px-2.5"
						onclick={() => handleDecrement(key)}
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
				<span class="ml-1 mr-3 text-7xl">{stepState.total_items}</span>
				<button
					type="submit"
					disabled={stepState.items.loading || !stepState.total_items}
					class="ml-2 mr-4 w-full bg-white p-3 text-black {stepState.total_items < 1
						? 'opacity-40'
						: ''}"
				>
					{#if stepState.total_items < 1}
						Please add items
					{:else}
						Next Step
					{/if}
				</button>
			</div>
		</div>
	</div>
</form>
