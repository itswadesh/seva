<script lang="ts">
	import { Command as CommandPrimitive } from 'bits-ui'
	import MagnifyingGlass from 'svelte-radix/MagnifyingGlass.svelte'
	import { cn } from '$lib/utils'

	let { ref = $bindable(null), class: className, value = $bindable(''), ...restProps }: CommandPrimitive.InputProps = $props()
</script>

<div class="flex items-center px-3" data-command-input-wrapper="">
	<MagnifyingGlass class="mr-2 size-4 shrink-0 opacity-50" />
	<CommandPrimitive.Input
		class={cn(
			'flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50',
			className
		)}
		bind:ref
		bind:value
		{...restProps}
	/>
</div>
