<script>
	import { goto } from '$app/navigation'
	import Button from '$lib/components/ui/button/button.svelte'
	import Input from '$lib/components/ui/input/input.svelte'

	import { Reload } from 'radix-icons-svelte'
	import { toast } from 'svelte-sonner'

	export let data
	let { supabase } = data
	$: ({ supabase } = data)

	let email = ''
	let password = ''
	let confirmPassword = ''
	let name = ''
	let phone = ''
	let bio = ''
	let address = ''
	let city = ''
	let state = ''
	let country = ''
	let zip = ''
	let googleMeetLink = ''
	let isLoading = false
	const handleSignUp = async () => {
		isLoading = true
		await supabase.auth.signUp({
			email,
			password
		})
		const userData = await fetch('/api/authentication', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email,
				name,
				phone,
				password,
				bio,
				address,
				city,
				state,
				country,
				zip,
				googleMeetLink
			})
		})

		isLoading = false
		if (x.error?.message) {
			toast.error(x.error?.message)
		} else {
			goto('/')
		}
	}

	const handleSignOut = async () => {
		await supabase.auth.signOut()
	}
</script>

<div class="flex items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
	<div class="w-full">
		<h1 class="mb-6 text-center text-2xl font-bold">Sign Up</h1>

		<form on:submit={handleSignUp} class="w-full space-y-4">
			<div>
				<label for="email" class="block text-sm font-medium text-gray-700">Email:</label>
				<Input
					id="email"
					name="email"
					bind:value={email}
					placeholder="Enter your email"
					required
					class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none  sm:text-sm"
				/>
			</div>
			<div>
				<label for="name" class="block text-sm font-medium text-gray-700">Name:</label>
				<Input
					id="name"
					name="name"
					bind:value={name}
					placeholder="Enter your Name"
					required
					class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none  sm:text-sm"
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
					class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none  sm:text-sm"
				/>
			</div>

			<div>
				<label for="confirmPassword" class="block text-sm font-medium text-gray-700"
					>Confirm Password:</label
				>
				<Input
					id="confirmPassword"
					type="password"
					name="confirmPassword"
					bind:value={confirmPassword}
					placeholder="Enter your confirmPassword"
					required
					class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none  sm:text-sm"
				/>
			</div>
			<div>
				<label for="phone" class="block text-sm font-medium text-gray-700">Phone:</label>
				<Input
					id="phone"
					name="phone"
					bind:value={phone}
					placeholder="Enter your phone"
					required
					class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none  sm:text-sm"
				/>
			</div>
			<div>
				<label for="bio" class="block text-sm font-medium text-gray-700">Bio:</label>
				<Input
					id="bio"
					name="bio"
					bind:value={bio}
					placeholder="Enter your bio"
					required
					class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none  sm:text-sm"
				/>
			</div>
			<div>
				<label for="address" class="block text-sm font-medium text-gray-700">Address:</label>
				<Input
					id="address"
					name="address"
					bind:value={address}
					placeholder="Enter your address"
					required
					class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none  sm:text-sm"
				/>
			</div>
			<div>
				<label for="city" class="block text-sm font-medium text-gray-700">City:</label>
				<Input
					id="city"
					name="city"
					bind:value={city}
					placeholder="Enter your city"
					required
					class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none  sm:text-sm"
				/>
			</div>
			<div>
				<label for="state" class="block text-sm font-medium text-gray-700">State:</label>
				<Input
					id="state"
					name="state"
					bind:value={state}
					placeholder="Enter your state"
					required
					class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none  sm:text-sm"
				/>
			</div>
			<div>
				<label for="country" class="block text-sm font-medium text-gray-700">Country:</label>
				<Input
					id="country"
					name="country"
					bind:value={country}
					placeholder="Enter your country"
					required
					class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none  sm:text-sm"
				/>
			</div>
			<div>
				<label for="zip" class="block text-sm font-medium text-gray-700">Zip:</label>
				<Input
					id="zip"
					name="zip"
					bind:value={zip}
					placeholder="Enter your zip"
					required
					class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none  sm:text-sm"
				/>
			</div>
			<div>
				<label for="googleMeetLink" class="block text-sm font-medium text-gray-700"
					>Google Meet Link:</label
				>
				<Input
					id="googleMeetLink"
					name="googleMeetLink"
					bind:value={googleMeetLink}
					placeholder="Enter your googleMeetLink"
					required
					class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none  sm:text-sm"
				/>
			</div>

			<br />
			<Button
				disabled={isLoading}
				type="submit"
				class="flex w-full justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium shadow-sm "
			>
				{#if isLoading}
					<Reload class="mr-2 h-4 w-4 animate-spin" />
					Please wait
				{:else}
					Sign up
				{/if}
			</Button>
		</form>
		<Button
			variant="link"
			on:click={() => goto('/auth/login')}
			class="mt-4 flex w-full justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium shadow-sm focus:outline-none focus:ring-2  focus:ring-offset-2"
			>Already have an acoount? Login Now</Button
		>
	</div>
</div>
