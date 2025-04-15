<script lang="ts">
	import { Check, ChevronsUpDown } from 'lucide-svelte'
	import { onMount, tick } from 'svelte'
	import * as Command from '$lib/components/ui/command'
	import * as Popover from '$lib/components/ui/popover'
	import { Button } from '$lib/components/ui/button'
	import { cn } from '$lib/utils'
	import Label from '../ui/label/label.svelte'
	import { MagnifyingGlass } from 'svelte-radix'
	import Input from '../ui/input/input.svelte'
	import Fuse from 'fuse.js'

	type SelectData = {
		name: string
		value: any
	}

	// type SelectProps = {
	// 	data: SelectData[]
	// 	optionSelected: (value: any) => void
	// 	id: string
	// 	title: string
	// 	errors?: Record<string, string>
	// 	value: any
	// 	label: string
	// }

	let {
		error = '',
		optional = false,
		info = '',
		class: klass = '',
		success = false,
		optionSelected = (value: any) => {},
		data,
		id = '',
		title = '',
		errors = {},
		value = '',
		label = '',
		valueField = 'value',
		...rest
	} = $props()
	let open = $state(false)
	let selectedValue = $state('Select')
	let searchQuery = $state('')
	let searchFuse: Fuse<any>
	let filteredData = $state(data)

	let hasRun = $state(false)

	// onMount(() => {
	// 	searchFuse = new Fuse(data, {
	// 		keys: ['name', 'value'],
	// 		includeScore: true,
	// 		threshold: 0.4
	// 	})
	// })

	$effect(() => {
		if (!data?.length && hasRun) return

		searchFuse = new Fuse(data, {
			keys: ['name', 'value', valueField],
			includeScore: true,
			threshold: 0.4
		})
		hasRun = true
	})

	$effect(() => {
		if (searchFuse && searchQuery) {
			let results = searchFuse.search(searchQuery)
			filteredData = results.map((r: any) => r.item)
		} else {
			filteredData = data
		}
	})

	// let value = $state('')
	$effect(() => {
		selectedValue = data.find((f: any) => f?.[valueField] === value)?.name ?? title
	})

	// an item from the list so users can continue navigating the
	// rest of the form with the keyboard.
	// function closeAndFocusTrigger(triggerId: string) {
	// 	open = false
	// 	tick().then(() => {
	// 		document.getElementById(triggerId)?.focus()
	// 	})
	// }

	let triggerRef = $state<HTMLButtonElement>(null!)

	function closeAndFocusTrigger() {
		open = false
		tick().then(() => {
			triggerRef.focus()
		})
	}
</script>

<div class="mb-3 space-y-2 {klass}">
	<Label class=" block text-sm text-gray-700 {klass}">
		{label}
		{#if optional}<span class="text-xs text-muted-foreground">(Optional)</span>{/if}
		<div class="relative h-full" {...rest}>
			<Popover.Root bind:open>
				<Popover.Trigger bind:ref={triggerRef} class={klass}>
					{#snippet child({ props })}
						<Button variant="outline" class=" justify-between" {...props} role="combobox" aria-expanded={open}>
							{selectedValue || 'Select...'}
							<ChevronsUpDown class="ml-2 size-4 shrink-0 opacity-50" />
						</Button>
					{/snippet}
				</Popover.Trigger>
				<Popover.Content class="relative z-[1000000000] p-0">
					<Command.Root>
						<!-- <Command.Input placeholder="Search..." /> -->

						<div class="flex items-center px-3">
							<MagnifyingGlass class="mr-2 size-4 shrink-0 opacity-50" />
							<Input
								bind:value={searchQuery}
								placeholder="Search..."
								class={cn(
									'flex h-10 w-full rounded-md border-none bg-transparent py-3 text-sm shadow-none outline-none placeholder:text-muted-foreground focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50'
								)}
							/>
						</div>
						<Command.List>
							<Command.Empty>Not found.</Command.Empty>
							<Command.Group>
								{#each filteredData as d}
									<Command.Item
										value={d[valueField]}
										onSelect={() => {
											optionSelected(d[valueField])
											value = d[valueField]
											closeAndFocusTrigger()
										}}
									>
										<Check class={cn('mr-2 size-4', value !== d[valueField] && 'text-transparent')} />
										{d.name}
									</Command.Item>
								{/each}
							</Command.Group>
						</Command.List>
					</Command.Root>
				</Popover.Content>
			</Popover.Root>
		</div>
	</Label>
</div>
{#if errors && errors[id]}
	<span class="text-red-500">{errors[id]}</span>
{/if}
