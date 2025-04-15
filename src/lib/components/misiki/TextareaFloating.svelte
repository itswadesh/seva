<script>
	import { createEventDispatcher } from 'svelte'

	const dispatch = createEventDispatcher()


	/** @type {{id?: string, maxlength: any, name?: string, placeholder?: string, required?: boolean, rows?: number, tabindex?: number, value?: string, label?: string, class?: string, children?: import('svelte').Snippet}} */
	let {
		id = 'textarea',
		maxlength,
		name = '',
		placeholder = ' ',
		required = false,
		rows = 4,
		tabindex = 0,
		value = $bindable(''),
		label = '',
		class: className = '',
		children
	} = $props();
	
</script>

<div class={className}>
	<div class="floating-label">
		<textarea
			bind:value
			{id}
			{name}
			{rows}
			class="floating-input w-full bg-transparent focus:outline-none"
			{placeholder}
			aria-label={label}
			{required}
			{tabindex}
			{maxlength}
			oninput={() => dispatch('input')}
			onfocus={() => dispatch('focus')}
		></textarea>

		<span class="highlight"></span>

		<label for={id}>
			{label}

			{#if required}
				<span class="text-red-600">*</span>
			{/if}
		</label>
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
