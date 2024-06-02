<script>
	import { createEventDispatcher } from 'svelte'
	const dispatch = createEventDispatcher()
	import Input from '$lib/components/ui/input/input.svelte'
	export let id = 'name'
	export let name = 'name'
	export let value = ''
	export let label = 'Full Name:'
	export let placeholder = 'Enter your name'
	export let type = 'text'
	export let maxlength = null
	export let autofocus = false
	export let errors
</script>

<div>
	<label for="name" class="block text-lg text-gray-700">
		{label}
	</label>
	<Input
		bind:value
		id="name"
		name="name"
		{type}
		{placeholder}
		{maxlength}
		{autofocus}
		class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none  sm:text-lg {errors[
			id
		]
			? 'border-red-500'
			: ''}"
		on:input={() => dispatch('input')}
		on:focus={() => dispatch('focus')}
		on:change={() => dispatch('change')}
	/>
	{#if errors[id]}
		<span class="text-red-500">{errors[id]}</span>{/if}
</div>
