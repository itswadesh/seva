<!-- <script lang="ts">
	import Check from 'svelte-radix/Check.svelte'
	import CaretSort from 'svelte-radix/CaretSort.svelte'
	import { tick } from 'svelte'
	import * as Command from '$lib/components/ui/command'
	import * as Popover from '$lib/components/ui/popover'
	import { Button } from '$lib/components/ui/button'
	import { cn } from '$lib/utils/index'
	import { createEventDispatcher } from 'svelte'
	let dispatch = createEventDispatcher() // Optional type definition for events

	let open = $state(false)
	interface Props {
		data?: any;
		id: any;
		title?: string;
		errors?: any;
		value?: string;
		label?: string;
	}

	let {
		data = [],
		id,
		title = '',
		errors = {},
		value = $bindable(''),
		label = ''
	}: Props = $props();

	let selectedValue = $derived(data.find((f) => f.value === value)?.name ?? title)

	// We want to refocus the trigger button when the user selects
	// an item from the list so users can continue navigating the
	// rest of the form with the keyboard.
	function closeAndFocusTrigger(triggerId: string) {
		open = false
		tick().then(() => {
			document.getElementById(triggerId)?.focus()
		})
	}
</script>

<label for="sevaPreference" class=" block text-lg text-gray-700">
	{label}
</label>
<div class="mx-1 my-2 w-96">
	<Popover.Root bind:open >
		{#snippet children({ ids })}
				<Popover.Trigger asChild >
				{#snippet children({ builder })}
						<Button
						builders={[builder]}
						variant="outline"
						role="combobox"
						aria-expanded={open}
						class="justify-between"
					>
						{selectedValue}
						<CaretSort class="ml-2 h-4 w-4 shrink-0 opacity-50" />
					</Button>
									{/snippet}
				</Popover.Trigger>
			<Popover.Content class="bg-white p-0">
				<Command.Root>
					<Command.Input placeholder="Search " class="h-9" />
					<Command.Empty>No class found.</Command.Empty>
					<Command.Group>
						{#each data as classs}
							<Command.Item
								value={classs.value}
								onSelect={(currentValue) => {
									dispatch('value', currentValue)
									value = currentValue
									closeAndFocusTrigger(ids.trigger)
								}}
							>
								<Check class={cn('mr-2 h-4 w-4', value !== classs.value && 'text-transparent')} />
								{classs.name}
							</Command.Item>
						{/each}
					</Command.Group>
				</Command.Root>
			</Popover.Content>
					{/snippet}
		</Popover.Root>
</div>
{#if errors[id]}
	<span class="text-red-500">{errors[id]}</span>
{/if} -->
