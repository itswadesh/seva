<script lang="ts">
	import { Button as ButtonPrimitive } from 'bits-ui';
	import { buttonVariants, type Props, type Events } from '.';
	import { cn } from '$lib/utils';
	import { Reload } from 'radix-icons-svelte';

	type $$Props = Props;
	type $$Events = Events;

	let className: $$Props['class'] = undefined;

	export let variant: $$Props['variant'] = 'default';
	export let size: $$Props['size'] = 'default';
	export let builders: $$Props['builders'] = [];
	export { className as class };

	export let loading = false;
	export let disabled = false;
</script>

<ButtonPrimitive.Root
	{builders}
	class={cn(buttonVariants({ variant, size, className }))}
	type="button"
	{...$$restProps}
	disabled={disabled || loading}
	on:click
	on:keydown
>
	{#if loading}
		<Reload class="mr-2 h-4 w-4 animate-spin" />
		Please wait
	{:else}
		<slot />
	{/if}
</ButtonPrimitive.Root>
