<script>
	import '../app.pcss';
	import { Button } from '$lib/components/ui/button';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Footer from '$lib/components/seva/Footer.svelte';
	import Nav from '$lib/components/seva/Nav.svelte';
</script>

<main class="mx-auto flex min-h-screen w-full max-w-md flex-col justify-between border-l border-r">
	<div class="h-full">
		<!-- Nav -->

		<Nav />

		<div class="grid grid-cols-5 gap-2 overflow-x-auto p-3">
			<Button
				variant={$page?.url?.pathname.includes('/step1') ? 'default' : 'secondary'}
				class="w-full"
				on:click={() => goto('/collect3/step1')}
			>
				Step1
			</Button>

			<Button
				variant={$page?.url?.pathname.includes('/step2') ? 'default' : 'secondary'}
				class="w-full"
				on:click={() => goto('/collect3/step2')}
			>
				Step2
			</Button>

			<Button
				variant={$page?.url?.pathname.includes('/step3') ? 'default' : 'secondary'}
				class="w-full"
				on:click={() => goto('/collect3/step3')}
			>
				Step3
			</Button>

			<Button
				variant={$page?.url?.pathname.includes('/step4') ? 'default' : 'secondary'}
				class="w-full"
				on:click={() => goto('/collect3/step4')}
			>
				Step4
			</Button>

			<Button
				variant={$page?.url?.pathname.includes('/preview') ? 'default' : 'secondary'}
				class="w-full"
				on:click={() => goto('/preview')}>Preview</Button
			>
		</div>

		<div class="flex-1 p-3">
			<slot />
		</div>
	</div>

	<!-- Footer -->

	<Footer />
</main>
