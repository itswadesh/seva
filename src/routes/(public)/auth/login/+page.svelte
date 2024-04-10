<script>
	import { goto } from '$app/navigation'
	import { Reload } from 'radix-icons-svelte'
	import { toast } from 'svelte-sonner'
	import Button from '$lib/components/misiki/button/button.svelte'
	import Input from '$lib/components/misiki/input/input.svelte'
	import { signing } from 'hono/utils/jwt/jws'

	export let data

	let phone = '+918895092508'
	let password = '20/06/1991'
	let isLoading = false
	const handleSignIn = async () => {
		isLoading = true
		try {
			const userData = await fetch('/api/auth/login', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ phone, password })
			})
		} catch (x) {
			if (x.error?.message) {
				toast.error(x.error?.message)
			} else {
				goto('/')
			}
		} finally {
			isLoading = false
		}
	}
</script>

<div class="flex items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
	<div class="w-full">
		<h1 class="mb-6 text-center text-2xl font-bold">Sign In</h1>

		<form on:submit={handleSignIn} class="w-full space-y-4">
			<div>
				<label for="phone" class="block text-sm font-medium text-gray-700">
					User Name (Mobile):
				</label>
				<Input
					id="phone"
					name="phone"
					bind:value={phone}
					placeholder="Enter your mobile no"
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
				{/if}
			</Button>
		</form>
		<Button
			variant="link"
			on:click={() => goto('/auth/signup')}
			class="mt-4 flex w-full justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium shadow-sm focus:outline-none focus:ring-2  focus:ring-offset-2"
		>
			Join as Sewadar. Signup Now</Button
		>
	</div>
</div>
