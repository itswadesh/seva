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
			<div class="grid grid-cols-5 gap-2 overflow-x-auto px-3 pb-1 pt-3">
				<!-- variant={currentStepUrl.includes('/step1') ? 'default' : 'secondary'} -->
				<Button
					variant="secondary"
					class="w-full {isComplete(1) ? 'bg-green-200' : ''}, {currentStepUrl.includes('/step1')
						? 'bg-blue-500'
						: 'secondary'}"
					on:click={() => gotoo(1)}
				>
					Step1
				</Button>

				<Button
					variant="secondary"
					class="w-full {isComplete(2) ? 'bg-green-200' : ''}, {currentStepUrl.includes('/step2')
						? 'bg-blue-500'
						: 'secondary'}"
					on:click={() => gotoo(2)}
					disabled={isDisabled(2)}
				>
					Step2
				</Button>

				<Button
					variant="secondary"
					class="w-full {isComplete(3) ? 'bg-green-200' : ''}, {currentStepUrl.includes('/step3')
						? 'bg-blue-500'
						: 'secondary'}"
					on:click={() => gotoo(3)}
					disabled={isDisabled(3)}
				>
					Step3
				</Button>

				<Button
					variant="secondary"
					class="w-full {isComplete(4) ? 'bg-green-200' : ''}, {currentStepUrl.includes('/step4')
						? 'bg-blue-500'
						: 'secondary'}"
					on:click={() => gotoo(4)}
					disabled={isDisabled(4)}
				>
					Step4
				</Button>

				<Button
					variant="secondary"
					class="w-full {isComplete(5) ? 'bg-green-200' : ''}, {currentStepUrl.includes('/preview')
						? 'bg-blue-500'
						: 'secondary'}"
					on:click={() => goto('/preview')}
					disabled={isDisabled(5)}>Preview</Button
				>
			</div>
		{/if}

		<div class="flex-1 px-3 py-1">
			<slot />
		</div>
	</div>

	<!-- Footer -->

	<Footer />
</main>
