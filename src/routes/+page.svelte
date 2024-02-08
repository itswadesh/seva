<script>
	import { Button } from "$lib/components/ui/button";
	import Input from "$lib/components/ui/input/input.svelte";
	$: isLogged = false;
    let username = "";
	let password = "";

	const handleChange = (e) => {
		if (e.target.name === "username") {
			username = e.target.value;
		} else {
			password = e.target.value;
		}

		console.log(username, password);
	};
	const handleLogin = async () => {

		try{
			// const newData = _handleSubmit(username, password)
			isLogged = true;
			// prompt(`Logged in successfully ${newData}`);

		} catch (e) {
			console.log(e);
		}
	};
</script>


{#if !isLogged}
	<div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-16" role="alert">
		<Input name="username" type="text" placeholder="Enter your Id" class="mb-4" on:change={handleChange} value={username}/>
		<Input name="password" type="password" placeholder="Enter your password" class="mb-4" on:change={handleChange} value={password} />
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div on:click={handleLogin}>
			<Button class="w-full" variant="secondary">Login</Button>
		</div>
	</div>
{:else} 
<main class="flex flex-col items-center justify-center mt-16">
	<h1 class="text-4xl font-semibold mb-8 text-center">
	  Welcome to the Seva Portal
	</h1>
	<p class="text-lg text-center mb-8">Providing essential services for all citizens</p>
	<div class="flex items-center">
		<Button href="/collect" class="mr-4">
			Collect Now
		</Button>
		<a href="/services" class="text-sm text-gray-600 underline">View Our Services</a>
	</div>
</main>
{/if}
