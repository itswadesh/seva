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
				<button
					class="w-full rounded border bg-gray-100 px-2 py-1 text-sm shadow-sm {isComplete(1)
						? 'border border-green-500 bg-green-200 font-bold text-green-500'
						: ''} {currentStepUrl.includes('/step1')
						? 'border border-blue-500 bg-blue-200 font-bold text-blue-500'
						: ''}"
					on:click={() => gotoo(1)}
				>
					Step1
				</button>

				<button
					class="w-full rounded border bg-gray-100 px-2 py-1 text-sm shadow-sm {isComplete(2)
						? 'border border-green-500 bg-green-200 font-bold text-green-500'
						: ''} {currentStepUrl.includes('/step2')
						? 'border border-blue-500 bg-blue-200 font-bold text-blue-500'
						: ''}"
					on:click={() => gotoo(2)}
					disabled={isDisabled(2)}
				>
					Step2
				</button>

				<button
					class="w-full rounded border bg-gray-100 px-2 py-1 text-sm shadow-sm {isComplete(3)
						? 'border border-green-500 bg-green-200 font-bold text-green-500'
						: ''} {currentStepUrl.includes('/step3')
						? 'border border-blue-500 bg-blue-200 font-bold text-blue-500'
						: ''}"
					on:click={() => gotoo(3)}
					disabled={isDisabled(3)}
				>
					Step3
				</button>

				<button
					class="w-full rounded border bg-gray-100 px-2 py-1 text-sm shadow-sm {isComplete(4)
						? 'border border-green-500 bg-green-200 font-bold text-green-500'
						: ''} {currentStepUrl.includes('/step4')
						? 'border border-blue-500 bg-blue-200 font-bold text-blue-500'
						: ''}"
					on:click={() => gotoo(4)}
					disabled={isDisabled(4)}
				>
					Step4
				</button>

				<button
					class="w-full rounded border bg-gray-100 px-2 py-1 text-sm shadow-sm {isComplete(5)
						? 'bg-green-200'
						: ''} {currentStepUrl.includes('/preview') ? 'bg-blue-200' : 'secondary'}"
					on:click={() => goto('/preview')}
					disabled={isDisabled(5)}>Preview</button
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
