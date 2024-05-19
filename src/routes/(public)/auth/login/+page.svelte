<script>
	import { goto } from '$app/navigation'
	import { Reload } from 'radix-icons-svelte'
	import { toast } from 'svelte-sonner'
	import Button from '$lib/components/misiki/button/button.svelte'
	import Input from '$lib/components/misiki/input/input.svelte'
	import axios from 'axios'
	export let data

	let phone = '+918895092508' // Separate +91
	let password = '22-06-1985'
	let isLoading = false

	import { getContext } from 'svelte'
	const userStore = getContext('user')

	const handleSignIn = async () => {
		isLoading = true
		try {
			const me = await axios.post('/api/auth/login', { phone, password })
			if (!me.data.sid) {
				userStore.updateMe({})
				toast.error(me.data.message)
				return
			}
			userStore.updateMe(me.data)
			goto('/')
		} catch (e) {
			userStore.updateMe({})
			toast.error(e.response.data)
		} finally {
			isLoading = false
		}
	}
</script>

<div class="flex items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
	<div class="w-full">
		<h1 class="mb-6 text-center text-2xl font-bold">Sevadar Login</h1>

		<form on:submit={handleSignIn} class="w-full space-y-4">
			<div>
				<label for="phone" class="block text-lg font-medium text-gray-700">
					User Name <span class="text-sm text-gray-500">(Mobile Number): </span>
				</label>
				<Input
					id="phone"
					name="phone"
					bind:value={phone}
					placeholder="Enter your mobile no"
					required
					class="mt-1 block w-full rounded-md px-3  py-2 shadow-sm focus:outline-none  sm:text-lg"
				/>
			</div>

			<div>
				<label for="password" class="block text-lg font-medium text-gray-700">
					Password <span class="text-sm text-gray-500">(DOB in dd-mm-yyyy format):</span>
				</label>
				<Input
					id="password"
					type="password"
					name="password"
					bind:value={password}
					placeholder="Enter your password"
					required
					class="mt-1 block w-full rounded-md border px-3  py-2 shadow-sm focus:outline-none  sm:text-lg"
				/>
			</div>
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
			on:click={() => goto('/auth/signup')}
			class="mt-4 flex w-full justify-center rounded-md border border-transparent px-4 py-2 text-lg font-medium text-blue-500 shadow-sm  focus:outline-none focus:ring-2 focus:ring-offset-2"
		>
			New Sevadar Registration
		</Button>
	</div>
</div>
