<script lang="ts">
	import { enhance } from '$app/forms'
	import { EyeClosed, EyeOpen } from 'radix-icons-svelte'
	import { formSchema, type LoginFormSchema } from './loginSchema'
	import { goto } from '$app/navigation'
	import { onMount } from 'svelte'
	import * as Form from '$lib/components/ui/form'
	import Button from '$lib/components/misiki/button/button.svelte'
	import Input from '$lib/components/misiki/input/input.svelte'
	import type { SuperValidated } from 'sveltekit-superforms'

	export let form: SuperValidated<LoginFormSchema>
	export let data

	$: isLogged = data.islogged

	let email = ''
	let loading = false
	let password = ''

	onMount(() => {
		console.log('isLogged', isLogged)

		if (isLogged) {
			console.log('redirecting to /collect')
			goto('/collect3/step1')
		}
	})

	let showPassword = false

	function togglePasswordVisibility() {
		showPassword = !showPassword
	}
</script>

{#if !isLogged}
	<div class="py-10">
		<h2 class="mb-5 text-center text-2xl font-bold">LogIn</h2>

		<form
			action="/"
			method="POST"
			class="flex flex-col gap-8"
			use:enhance={() => {
				loading = true

				return async ({ result }) => {
					// console.log('result', result)

					loading = false
				}
			}}
		>
			<div class="flex flex-col gap-4">
				<Input
					id="email"
					name="email"
					label="Email"
					bind:value={email}
					placeholder="Enter your email"
					required
				/>

				<div class="relative">
					<Input
						id="password"
						type={showPassword ? 'text' : 'password'}
						name="password"
						label="Password"
						bind:value={password}
						placeholder="Enter your password"
						required
					/>

					<button
						type="button"
						class="absolute right-2 top-[38px] transform"
						on:click={togglePasswordVisibility}
					>
						{#if showPassword}
							<EyeOpen />
						{:else}
							<EyeClosed />
						{/if}
					</button>
				</div>
			</div>

			<Button type="submit" {loading}>Sign in</Button>
		</form>
	</div>
{:else}
	<main class="flex flex-col items-center justify-center">
		<h1 class="mb-8 text-center text-4xl font-semibold">Welcome to the Seva Portal</h1>

		<p class="mb-8 text-center text-lg">Providing essential services for all citizens</p>

		<div class="flex items-center">
			<a href="/collect3/step1">
				<Button class="mr-4">Collect Now</Button>
			</a>

			<a href="/services" class="text-sm text-gray-600 underline">View Our Services</a>
		</div>
	</main>
{/if}
