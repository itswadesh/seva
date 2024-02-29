<script>
	import { goto } from '$app/navigation'
	import { Reload } from 'radix-icons-svelte'
	import { toast } from 'svelte-sonner'
	import Button from '$lib/components/misiki/button/button.svelte'
	import Input from '$lib/components/misiki/input/input.svelte'

	export let data
	let { supabase } = data
	$: ({ supabase } = data)

	let email = ''
	let password = ''
	let isLoading = false
	const handleSignIn = async () => {
		isLoading = true
		const x = await supabase.auth.signInWithPassword({
			email,
			password
		})
		isLoading = false
		if (x.error?.message) {
			toast.error(x.error?.message)
		} else {
			goto('/')
		}
	}
</script>

<div class="flex items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
	<div class="w-full">
		<h1 class="mb-6 text-center text-2xl font-bold">Sign In</h1>

		<form on:submit={handleSignIn} class="w-full space-y-4">
			<div>
				<label for="email" class="block text-sm font-medium text-gray-700">Email:</label>
				<Input
					id="email"
					name="email"
					bind:value={email}
					placeholder="Enter your email"
					required
					class="mt-1 block w-full rounded-md px-3  py-2 shadow-sm focus:outline-none  sm:text-sm"
				/>
			</div>

			<div>
				<label for="password" class="block text-sm font-medium text-gray-700">Password:</label>
				<Input
					id="password"
					type="password"
					name="password"
					bind:value={password}
					placeholder="Enter your password"
					required
					class="mt-1 block w-full rounded-md border px-3  py-2 shadow-sm focus:outline-none  sm:text-sm"
				/>
			</div>
			<br />
			<Button
				disabled={isLoading}
				type="submit"
				class="flex w-full justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium shadow-sm  focus:outline-none focus:ring-2 focus:ring-offset-2 "
			>
				{#if isLoading}
					<Reload class="mr-2 h-4 w-4 animate-spin" />
					Please wait
				{:else}
					Sign in
				{/if}</Button
			>
		</form>
		<Button
			variant="link"
			on:click={() => goto('/auth/signup')}
			class="mt-4 flex w-full justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium shadow-sm focus:outline-none focus:ring-2  focus:ring-offset-2"
			>Join as author. Signup Now</Button
		>
	</div>
</div>
