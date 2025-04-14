<script lang="ts">
	import '../../app.pcss'
	import { Button } from '$lib/components/ui/button'
	import { goto } from '$app/navigation'
	import { page } from '$app/state'
	import Footer from '$lib/components/seva/Footer.svelte'
	import Nav from '$lib/components/seva/Nav.svelte'
	import { fade, fly } from 'svelte/transition'
	import { onMount } from 'svelte'
	// import { getContext } from 'svelte'
	// const userStore = getContext('user')
	import { getUserState } from '$lib/user.svelte'
	import { getStepState } from '$lib/steps.svelte'
	const stepState = getStepState()

	interface Props {
		data: any
		children?: import('svelte').Snippet
	}

	let { data, children }: Props = $props()
	let currentStepUrl = $derived(page?.url?.pathname)
	let currentStep = $derived(currentStepUrl.split('/')[2]?.match(/\d+/) || 0)

	const gotoo = (step: number) => {
		goto(`/collect3/step${step}?sangat_id=${page.url.searchParams.get('sangat_id') || ''}`)
	}

	let isComplete = $derived((step: number) => {
		return currentStep > step
	})
	let isDisabled = $derived((step: number) => {
		return currentStep < step
	})

	onMount(() => {
		// console.log(userStore.me)
		// if (!userStore.me?.sid) {
		// 	goto('/auth/login')
		// }
	})
</script>

<main
	class="mx-auto flex min-h-screen w-full flex-col justify-between
	{page.url?.pathname === '/admin' ? 'max-w-full' : ' max-w-md'}"
>
	<div class="h-full">
		<!-- Nav -->
		<Nav programData={data.programData} />

		{#if page.url.pathname !== '/' && page.url.pathname !== '/auth/login'}
			<div class="grid grid-cols-5 gap-2 overflow-x-auto px-3 pb-1 pt-3">
				<button
					class="w-full rounded border bg-gray-100 px-2 py-1 text-sm shadow-sm {isComplete(1)
						? 'border border-green-500 bg-green-200 font-bold text-black'
						: ''} {currentStepUrl.includes('/step1')
						? 'border border-blue-500 bg-blue-200 font-bold text-blue-500'
						: ''}"
					onclick={() => gotoo(1)}
				>
					Step1
				</button>
				{#if page.url.pathname != '/collect3/preview5' && page.url.pathname != '/give-back'}
					<button
						class="w-full rounded border bg-gray-100 px-2 py-1 text-sm shadow-sm {isComplete(2)
							? 'border border-green-500 bg-green-200 font-bold text-black'
							: ''} {currentStepUrl.includes('/step2')
							? 'border border-blue-500 bg-blue-200 font-bold text-blue-500'
							: ''}"
						onclick={() => gotoo(2)}
						disabled={isDisabled(2)}
					>
						Step2
					</button>

					<button
						class="w-full rounded border bg-gray-100 px-2 py-1 text-sm shadow-sm {isComplete(3)
							? 'border border-green-500 bg-green-200 font-bold text-black'
							: ''} {currentStepUrl.includes('/step3')
							? 'border border-blue-500 bg-blue-200 font-bold text-blue-500'
							: ''}"
						onclick={() => gotoo(3)}
						disabled={isDisabled(3)}
					>
						Step3
					</button>

					<button
						class="w-full rounded border bg-gray-100 px-2 py-1 text-sm shadow-sm {isComplete(4)
							? 'border border-green-500 bg-green-200 font-bold text-black'
							: ''} {currentStepUrl.includes('/step4')
							? 'border border-blue-500 bg-blue-200 font-bold text-blue-500'
							: ''}"
						onclick={() => gotoo(4)}
						disabled={isDisabled(4)}
					>
						Step4
					</button>
				{/if}
				<button
					class="w-full rounded border bg-gray-100 px-2 py-1 text-sm shadow-sm {isComplete(5)
						? 'border border-green-500 bg-green-200 font-bold text-black'
						: ''} {currentStepUrl.includes('/preview')
						? 'border border-blue-500 bg-blue-200 font-bold text-blue-500'
						: ''}"
					onclick={() => goto('/preview')}
					disabled={isDisabled(5)}
				>
					Preview
				</button>
			</div>
		{/if}

		<div class="flex-1 px-3 py-1">
			{#key data.url}
				<div in:fly={{ y: -50, duration: 100 }} out:fade={{ duration: 100 }} class="">
					{@render children?.()}
				</div>
			{/key}
		</div>
	</div>
</main>
