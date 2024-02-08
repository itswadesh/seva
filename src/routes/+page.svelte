<script>
	// import { toast } from '$lib/utils';
	import { Button } from '$lib/components/ui/button';
	import Input from '$lib/components/ui/input/input.svelte';
	// import { _handleSubmit } from './+page.server';

	$: isLogged = false;
	let username = '';
	let password = '';

	const handleChange = (e) => {
		if (e.target.name === 'username') {
			username = e.target.value;
		} else {
			password = e.target.value;
		}

		console.log(username, password);
	};
	const handleLogin = async () => {
		try {
			// const newData = _handleSubmit(username, password)

			isLogged = true;
			// prompt(`Logged in successfully ${newData}`);

			// toast(``)
		} catch (e) {
			console.log(e);
		}
	};
</script>

{#if !isLogged}
	<div
		class="relative mt-16 rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700"
		role="alert"
	>
		<Input
			name="username"
			type="text"
			placeholder="Enter your Id"
			class="mb-4"
			on:change={handleChange}
			value={username}
		/>
		<Input
			name="password"
			type="password"
			placeholder="Enter your password"
			class="mb-4"
			on:change={handleChange}
			value={password}
		/>
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div on:click={handleLogin}>
			<Button class="w-full" variant="secondary">Login</Button>
		</div>
	</div>
{:else}
	<main class="flex flex-col items-center justify-center">
		<h1 class="mb-8 text-center text-4xl font-semibold">Welcome to the Seva Portal</h1>
		<p class="mb-8 text-center text-lg">Providing essential services for all citizens</p>
		<div class="flex items-center">
			<a href="/collect">
				<Button class="mr-4">Collect Now</Button>
			</a>

			<a href="/services" class="text-sm text-gray-600 underline">View Our Services</a>
		</div>
	</main>
{/if}
