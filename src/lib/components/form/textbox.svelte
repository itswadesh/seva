<script lang="ts">
	import { createEventDispatcher } from 'svelte'
	import { Input } from '$lib/components/ui/input'
	import type { HTMLInputAttributes } from 'svelte/elements'
	import type { z } from 'zod'
	import { cn } from '$lib/utils'
	import Label from '../ui/label/label.svelte'
	import { AlertCircle, Eye, EyeOff } from 'lucide-svelte'

	interface $$Props extends HTMLInputAttributes {
		label?: string
		error?: string | string[]
		schema?: z.ZodType<any>
		validateOnChange?: boolean
		optional?: boolean
		info?: string
		success?: boolean
		type?: string
		value?: string
		valid?: boolean
	}

	let {
		label,
		error,
		schema,
		validateOnChange = true,
		value = $bindable(),
		class: className = '',
		optional = false,
		info = '',
		success = false,
		type = 'text',
		validityChange,
		...props
	} = $props<$$Props>()

	const dispatch = createEventDispatcher()
	let validationError = $state('')
	let touched = $state(false)
	let isValid = $state(true)
	let showPassword = $state(false)

	function validateInput(val: string) {
		if (!schema) return true
		const result = schema.safeParse(val)
		validationError = result.success ? '' : result.error.errors[0].message
		isValid = result.success
		validityChange(result.success)
		return result.success
	}

	function handleInput(event: Event) {
		if (!schema || !validateOnChange) return
		const input = event.target as HTMLInputElement
		validateInput(input.value)
	}

	function handleBlur() {
		if (!schema) return
		validateInput(value)
	}

	function togglePassword() {
		showPassword = !showPassword
		type = showPassword ? 'text' : 'password'
	}

	$effect(() => {
		if (error) {
			validationError = Array.isArray(error) ? error[0] : error
			isValid = false
		}
	})

	// Expose validation state
	export { isValid as valid }
</script>

<div class="mb-3 space-y-2">
	<Label class="block text-sm font-medium">
		{label}
		{#if optional}<span class="text-xs text-muted-foreground">(Optional)</span>{/if}
	</Label>
	<div class="relative">
		<Input
			{...props}
			{type}
			bind:value
			oninput={(e) => {
				touched = true
				handleInput(e)
			}}
			class={cn(
				className,
				'w-full',
				touched ? (isValid ? 'border-green-500 focus:border-green-500' : 'border-red-500 focus:border-red-500') : 'border-gray-200'
			)}
			{...props}
		/>

		{#if props.type === 'password'}
			<button type="button" class="absolute right-3 top-1/2 -translate-y-1/2 transform" onclick={togglePassword}>
				{#if showPassword}
					<EyeOff class="h-4 w-4 text-gray-500 hover:text-gray-700" />
				{:else}
					<Eye class="h-4 w-4 text-gray-500 hover:text-gray-700" />
				{/if}
			</button>
		{/if}
	</div>
	{#if (validationError || error) && touched}
		<div class="mt-1 flex items-center space-x-1">
			<AlertCircle class="h-4 w-4 text-destructive" />
			<p class="text-sm font-medium text-destructive">{validationError || (Array.isArray(error) ? error[0] : error)}</p>
		</div>
	{/if}

	{#if info}
		<p class="text-xs text-muted-foreground">{info}</p>
	{/if}
</div>
