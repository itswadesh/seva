<script>
	import { z } from 'zod'
	import { goto } from '$app/navigation'
	import { Reload } from 'radix-icons-svelte'
	import { toast } from 'svelte-sonner'
	import Button from '$lib/components/misiki/button/button.svelte'
	// import Input from '$lib/components/misiki/input/input.svelte'
	import { Textbox } from '$lib/components/misiki'
	// import axios from 'axios'

	import { getUserState } from '$lib/user.svelte'
	import * as env from '$env/static/public'
	const userState = getUserState()

	let phone = $state(env?.PUBLIC_IS_DEV ? '8895092508' : '')
	let password = $state(env?.PUBLIC_IS_DEV ? '22061985' : '')
	let isLoading = $state(false)
	let errors = $state({})

	/** @type {{data: any}} */
	let { data } = $props()

	const handleSignIn = async () => {
		const loginSchema = z.object({
			phone: z
				.string({ invalid_type_error: 'Incorrect phone number' })
				.regex(/^\d{10}$/, { message: 'Phone number must be exactly 10 digits' }),
			password: z
				.string({ message: 'Please enter your password' })
				.min(3, { message: 'Password must be minimum 3 characters' })
		})
		const user = { phone, password }
		try {
			const result = loginSchema.parse(user)
			isLoading = true
			userState.login(user)
		} catch (e) {
			const { fieldErrors: err } = e.flatten()
			errors = err
			return toast.error(errors[Object.keys(errors)[0]][0])
		} finally {
			isLoading = false
		}
	}
</script>

<div class="flex items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
	<div class="w-full">
		<h1 class="mb-6 text-center text-2xl font-bold">Sevadar Login</h1>

		<form onsubmit={handleSignIn} class="w-full space-y-4">
			<Textbox
				id="phone"
				name="phone"
				type="tel"
				label="UserName (10 digit Mobile Number):"
				autofocus
				bind:value={phone}
				placeholder="Enter your phone"
				{errors}
			/>
			<Textbox
				id="password"
				type="tel"
				name="password"
				label="Password (DOB: ddmmyyyy):"
				bind:value={password}
				placeholder="Enter your password"
				{errors}
			/>
			<br />
			<Button
				disabled={isLoading}
				type="submit"
				class="flex w-full justify-center rounded-md border border-transparent bg-green-500 px-4 py-2 text-lg font-medium  shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 "
			>
				{#if isLoading}
					<Reload class="mr-2 h-4 w-4 animate-spin" />
					Please wait
				{:else}
					Login
				{/if}
			</Button>
		</form>
		<Button
			variant="link"
			type="button"
			href="/auth/signup"
			class="mt-4 flex w-full justify-center rounded-md border border-transparent px-4 py-2 text-lg font-medium text-blue-500 shadow-sm  focus:outline-none focus:ring-2 focus:ring-offset-2"
		>
			New Sevadar Registration
		</Button>
	</div>
</div>
