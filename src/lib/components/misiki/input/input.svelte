<script lang="ts">
	import { createBubbler } from 'svelte/legacy';

	const bubble = createBubbler();
	import { Button } from '$lib/components/ui/button'
	import { cn } from '$lib/utils'
	import { InfoCircled } from 'radix-icons-svelte'
	import * as Tooltip from '$lib/components/ui/tooltip'
	import type { HTMLInputAttributes } from 'svelte/elements'
	import type { InputEvents } from '.'

	type $$Props = HTMLInputAttributes
	type $$Events = InputEvents

	

	interface Props {
		class?: $$Props['class'];
		value?: $$Props['value'];
		label?: string;
		tooltip?: string;
		[key: string]: any
	}

	let {
		class: className = undefined,
		value = $bindable(undefined),
		label = '',
		tooltip = '',
		...rest
	}: Props = $props();
</script>

<label class="flex items-center">
	{#if label || tooltip}
		<div class="flex items-center justify-between gap-2">
			{#if label}
				<p class="mb-1.5 mr-2 w-24 text-sm">{label}</p>
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
			'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2  ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
			className
		)}
		bind:value
		onblur={bubble('blur')}
		onchange={bubble('change')}
		onclick={bubble('click')}
		onfocus={bubble('focus')}
		onfocusin={bubble('focusin')}
		onfocusout={bubble('focusout')}
		onkeydown={bubble('keydown')}
		onkeypress={bubble('keypress')}
		onkeyup={bubble('keyup')}
		onmouseover={bubble('mouseover')}
		onmouseenter={bubble('mouseenter')}
		onmouseleave={bubble('mouseleave')}
		onpaste={bubble('paste')}
		oninput={bubble('input')}
		{...rest}
	/>
</label>
