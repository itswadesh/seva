<script>
	import { createEventDispatcher } from 'svelte'
	const dispatch = createEventDispatcher()
	import Input from '$lib/components/ui/input/input.svelte'
	/** @type {{id?: string, name?: string, value?: string, label?: string, placeholder?: string, type?: string, maxlength?: any, autofocus?: boolean, errors: any}} */
	let {
		id = 'name',
		name = 'name',
		value = $bindable(''),
		label = 'Full Name:',
		placeholder = 'Enter your name',
		type = 'text',
		maxlength = null,
		autofocus = false,
		errors
	} = $props();
</script>

<div>
	<label for="name" class="block text-xl text-gray-700">
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
		class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-3xl shadow-sm focus:outline-none  sm:text-lg {errors[
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
