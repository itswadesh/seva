<script>
	import { createEventDispatcher } from 'svelte'

	const dispatch = createEventDispatcher()

	/** @type {{label?: string, type?: string, value?: string, id?: string, name?: string, class?: string, placeholder?: string, required?: boolean, tabindex?: number, maxlength?: number, children?: import('svelte').Snippet}} */
	let {
		label = '',
		type = 'text',
		value = $bindable(''),
		id = '',
		name = '',
		class: className = '',
		placeholder = ' ',
		required = false,
		tabindex = 0,
		maxlength = 4000,
		children
	} = $props();

	
</script>

<div class={className}>
	<div class="floating-label">
		{#if type === 'text'}
			<input
				type="text"
				bind:value
				{id}
				{name}
				class="floating-input w-full bg-transparent focus:outline-none"
				{placeholder}
				aria-label={label}
				{required}
				{tabindex}
				{maxlength}
				oninput={() => dispatch('input')}
				onfocus={() => dispatch('focus')}
			/>
		{:else if type === 'email'}
			<input
				type="email"
				bind:value
				{id}
				{name}
				class="floating-input w-full bg-transparent focus:outline-none"
				{placeholder}
				aria-label={label}
				{required}
				{tabindex}
				{maxlength}
				oninput={() => dispatch('input')}
				onfocus={() => dispatch('focus')}
			/>
		{:else if type === 'password'}
			<input
				type="password"
				bind:value
				id="password"
				name="password"
				class="floating-input w-full bg-transparent focus:outline-none"
				{placeholder}
				aria-label={label}
				{required}
				{tabindex}
				{maxlength}
				oninput={() => dispatch('input')}
				onfocus={() => dispatch('focus')}
			/>
		{:else if type === 'date'}
			<input
				type="date"
				bind:value
				{id}
				{name}
				class="floating-input w-full bg-transparent focus:outline-none"
				{placeholder}
				aria-label={label}
				{required}
				{tabindex}
				{maxlength}
				oninput={() => dispatch('input')}
				onfocus={() => dispatch('focus')}
			/>
		{:else if type === 'time'}
			<input
				type="time"
				bind:value
				name="time"
				id="time"
				class="floating-input w-full bg-transparent focus:outline-none"
				{placeholder}
				aria-label={label}
				{required}
				{tabindex}
				{maxlength}
				oninput={() => dispatch('input')}
				onfocus={() => dispatch('focus')}
			/>
		{:else if type === 'number'}
			<input
				type="number"
				bind:value
				{id}
				{name}
				class="floating-input w-full bg-transparent focus:outline-none"
				{placeholder}
				aria-label={label}
				{required}
				{tabindex}
				{maxlength}
				oninput={() => dispatch('input')}
				onfocus={() => dispatch('focus')}
			/>
		{:else if type === 'tel'}
			<input
				type="tel"
				bind:value
				{id}
				{name}
				class="floating-input w-full bg-transparent focus:outline-none"
				{placeholder}
				aria-label={label}
				{required}
				{tabindex}
				{maxlength}
				oninput={() => dispatch('input')}
				onfocus={() => dispatch('focus')}
			/>
		{/if}
		<span class="highlight"></span>

		<label for="textbox">{label}</label>
		{@render children?.()}
	</div>
</div>

<style>
	.floating-label {
		position: relative;
	}
	.floating-input {
		font-size: 14px;
		color: black;
		display: block;
		width: 100%;
		height: 46px;
		padding: 12px 0 0 0;
		border-bottom: 2px solid #e5e7eb;
	}
	.floating-input:focus {
		outline: none;
		border-bottom: 2px solid #112d4e;
	}
	label {
		color: #1f2937;
		font-size: 14px;
		font-weight: normal;
		position: absolute;
		pointer-events: none;
		left: 0px;
		top: 18px;
		transition: 0.2s ease all;
		-moz-transition: 0.2s ease all;
		-webkit-transition: 0.2s ease all;
	}

	.floating-input:focus ~ label,
	.floating-input:not(:placeholder-shown) ~ label {
		top: 0px;
		font-size: 12px;
		color: #999;
	}

	input:-webkit-autofill,
	input:-webkit-autofill:hover,
	input:-webkit-autofill:focus,
	input:-webkit-autofill:active {
		transition: background-color 5000s ease-in-out 0s;
	}
</style>
