<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Form from '$lib/components/ui/form';
	import { formSchema, type LoginFormSchema } from './loginSchema';
	import type { SuperValidated } from 'sveltekit-superforms';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	export let form: SuperValidated<LoginFormSchema>;
    export let data

	$: isLogged = data.islogged
	onMount(() => {
    console.log('isLogged', isLogged);
    if (isLogged) {
        console.log('redirecting to /collect');
        goto('/collect');
    }
});
</script>

{#if !isLogged}
	<div
		class="relative mt-16 rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700"
		role="alert"
	>
	<Form.Root method="POST" {form} schema={formSchema} let:config>
		<Form.Field {config} name="username">
			<Form.Item>
				<Form.Label>Username</Form.Label>
				<Form.Input />
				<Form.Validation />
			</Form.Item>
		</Form.Field>
		<Form.Field {config} name="password">
			<Form.Item>
				<Form.Label>Password</Form.Label>
				<Form.Input />
				<Form.Validation />
			</Form.Item>
		</Form.Field>
		<Button type="submit" class="w-full" variant="secondary">
			Submit </Button>
	</Form.Root>
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
