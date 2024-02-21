<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { EyeClosed, EyeOpen } from 'radix-icons-svelte';
	import { formSchema, type LoginFormSchema } from './loginSchema';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import * as Form from '$lib/components/ui/form';
	import type { SuperValidated } from 'sveltekit-superforms';

	export let form: SuperValidated<LoginFormSchema>;
	export let data;

	$: isLogged = data.islogged;

	onMount(() => {
		console.log('isLogged', isLogged);

		if (isLogged) {
			console.log('redirecting to /collect');
			goto('/collect3/step1');
		}
	});

	let showPassword = false;

	function togglePasswordVisibility() {
		showPassword = !showPassword;
	}
</script>

{#if !isLogged}
	<div class="rounded border p-5" role="alert">
		<Form.Root method="POST" {form} schema={formSchema} let:config class="flex flex-col gap-5">
			<div class="flex flex-col gap-2">
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

						<div class="relative">
							<Form.Input type={showPassword ? 'text' : 'password'} />

							<button
								type="button"
								class="absolute right-2 top-1/2 -translate-y-1/2 transform"
								on:click={togglePasswordVisibility}
							>
								{#if showPassword}
									<EyeOpen />
								{:else}
									<EyeClosed />
								{/if}
							</button>
						</div>

						<Form.Validation />
					</Form.Item>
				</Form.Field>
			</div>

			<Button type="submit" class="w-full">Submit</Button>
		</Form.Root>
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
