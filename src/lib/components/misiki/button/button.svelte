<script lang="ts">
	import { Button as ButtonPrimitive } from 'bits-ui'
	import { buttonVariants, type Props, type Events } from '.'
	import { cn } from '$lib/utils'
	import { Reload } from 'radix-icons-svelte'

	type $$Props = Props
	type $$Events = Events


	

	interface Props_1 {
		class?: $$Props['class'];
		variant?: $$Props['variant'];
		size?: $$Props['size'];
		builders?: $$Props['builders'];
		loading?: boolean;
		disabled?: boolean;
		children?: import('svelte').Snippet;
		[key: string]: any
	}

	let {
		class: className = undefined,
		variant = 'default',
		size = 'default',
		builders = [],
		loading = false,
		disabled = false,
		children,
		...rest
	}: Props_1 = $props();
</script>

<ButtonPrimitive.Root
	{builders}
	class={cn(buttonVariants({ variant, size, className }))}
	type="button"
	{...rest}
	disabled={disabled || loading}
	on:click
	on:keydown
>
	{#if loading}
		<Reload class="mr-2 h-4 w-4 animate-spin" />
		Please wait
	{:else}
		{@render children?.()}
	{/if}
</ButtonPrimitive.Root>
