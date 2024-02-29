<script lang="ts">
	import { Button } from '$lib/components/ui/button'
	import { cn } from '$lib/utils'
	import { InfoCircled } from 'radix-icons-svelte'
	import * as Tooltip from '$lib/components/ui/tooltip'
	import type { HTMLInputAttributes } from 'svelte/elements'
	import type { InputEvents } from '.'

	type $$Props = HTMLInputAttributes
	type $$Events = InputEvents

	let className: $$Props['class'] = undefined
	export let value: $$Props['value'] = undefined
	export { className as class }

	export let label = ''
	export let tooltip = ''
</script>

<label>
	{#if label || tooltip}
		<div class="flex items-center justify-between gap-2">
			{#if label}
				<p class="mb-1.5 text-sm">{label}</p>
			{/if}

			{#if tooltip}
				<div class="ml-auto">
					<Tooltip.Root>
						<Tooltip.Trigger>
							<InfoCircled class="h-4 w-4" />
						</Tooltip.Trigger>
						<Tooltip.Content>
							<p>{tooltip}</p>
						</Tooltip.Content>
					</Tooltip.Root>
				</div>
			{/if}
		</div>
	{/if}

	<input
		class={cn(
			'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
			className
		)}
		bind:value
		on:blur
		on:change
		on:click
		on:focus
		on:focusin
		on:focusout
		on:keydown
		on:keypress
		on:keyup
		on:mouseover
		on:mouseenter
		on:mouseleave
		on:paste
		on:input
		{...$$restProps}
	/>
</label>
