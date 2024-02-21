<script lang="ts">
	import '../app.pcss';
	import { Button } from '$lib/components/ui/button';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Footer from '$lib/components/seva/Footer.svelte';
	import Nav from '$lib/components/seva/Nav.svelte';

	$: currentStepUrl = $page?.url?.pathname;
	$: currentStep = currentStepUrl.split('/')[2]?.match(/\d+/) || 0;

	const gotoo = (step: number) => {
		goto(`/collect3/step${step}`);
	};

	$: isComplete = (step: number) => {
		return currentStep > step;
	};
	$: isDisabled = (step: number) => {
		return currentStep < step;
	};
</script>

<main
	class="mx-auto flex min-h-screen w-full flex-col justify-between border-l border-r
	{$page.url?.pathname === '/admin' ? 'max-w-full' : ' max-w-md'}"
>
	<div class="h-full">
		<!-- Nav -->

		<Nav />

		{#if $page.url.pathname !== '/'}
			<div class="grid grid-cols-5 gap-2 overflow-x-auto p-3">
				<Button
					variant={currentStepUrl.includes('/step1') ? 'default' : 'secondary'}
					class="w-full {isComplete(1) ? 'bg-green-200' : ''}"
					on:click={() => gotoo(1)}
				>
					Step1
				</Button>

				<Button
					variant={currentStepUrl.includes('/step2') ? 'default' : 'secondary'}
					class="w-full {isComplete(2) ? 'bg-green-200' : ''}"
					on:click={() => gotoo(2)}
					disabled={isDisabled(2)}
				>
					Step2
				</Button>

				<Button
					variant={currentStepUrl.includes('/step3') ? 'default' : 'secondary'}
					class="w-full {isComplete(3) ? 'bg-green-200' : ''}"
					on:click={() => gotoo(3)}
					disabled={isDisabled(3)}
				>
					Step3
				</Button>

				<Button
					variant={currentStepUrl.includes('/step4') ? 'default' : 'secondary'}
					class="w-full {isComplete(4) ? 'bg-green-200' : ''}"
					on:click={() => gotoo(4)}
					disabled={isDisabled(4)}
				>
					Step4
				</Button>

				<Button
					variant={currentStepUrl.includes('/preview') ? 'default' : 'secondary'}
					class="w-full {isComplete(5) ? 'bg-green-200' : ''}"
					on:click={() => goto('/preview')}
					disabled={isDisabled(5)}>Preview</Button
				>
			</div>
		{/if}

		<div class="flex-1 p-3">
			<slot />
		</div>
	</div>

	<!-- Footer -->

	<Footer />
</main>
