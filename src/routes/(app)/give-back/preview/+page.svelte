<script lang="ts">
	import { onMount } from 'svelte'
	import { page } from '$app/state'
	import { Button } from '$lib/components/ui/button'
	import { goto } from '$app/navigation'
	import axios from 'axios'
	let tokenData = $state({})

	onMount(async () => {
		tokenData = await fetch(
			`/api/sangat/get-token-data?token_no=${page.url.searchParams.get('token_no') || ''}`
		).then((res) => res.json())
	})

	const giveBack = async () => {
		try {
			const res = await axios.post(`/api/sangat/give-back`, {
				tokenNo: tokenData.TokenNo
			})
			console.log(res)
			if (res) {
				goto(`/give-back/success?message=Token given back: ${tokenData.TokenNo}`, { replaceState: true })
			}
		} catch (e) {
			console.error('Failed to give back token:', e)
			goto(
				`/give-back/error?message=${(e as Error)?.response?.data?.message || 'Failed to give back token'}`,
				{
					replaceState: true
				}
			)
		}
	}

	const dispute = async () => {
		try {
			if (confirm('Are you sure to raise dispute?')) {
				const res = await axios.post(`/api/sangat/dispute`, {
					tokenNo: tokenData.TokenNo
				})
				if (res) {
					goto(`/give-back/success?message=Token disputed: ${tokenData.TokenNo}`, { replaceState: true })
				}
			}
		} catch (e) {
			console.error('Failed to raise dispute:', e)
			goto(
				`/give-back/error?message=${(e as Error)?.response?.data?.message || 'Failed to raise dispute'}`,
				{
					replaceState: true
				}
			)
		}
	}
</script>

<div>
	<div class="grid grid-cols-2">
		<img
			src={tokenData.CollectSangatFaceImage}
			alt="Sangat face missing"
			class="h-40 w-auto object-contain object-left"
		/>
		<div class="flex flex-col items-center">
			{#if !tokenData.ItemsImageFront}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="mb-2 h-8 w-8 text-gray-500 dark:text-gray-400"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
					/>
				</svg>
			{:else}
				<img
					src={tokenData.ItemsImageFront}
					alt="Items front image missing"
					class="h-40 w-auto object-contain object-left"
				/>
			{/if}
			{#if !tokenData.ItemsImageBack}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="mb-2 h-8 w-8 text-gray-500 dark:text-gray-400"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
					/>
				</svg>
			{:else}
				<img
					src={tokenData.ItemsImageBack}
					alt="Items back image missing"
					class="h-40 w-auto object-contain object-left"
				/>
			{/if}
		</div>
	</div>
	<div class="flex items-center gap-5 text-3xl font-bold">
		<div class="w-full bg-gray-200 p-4">Total Items</div>
		<div class="w-32 bg-gray-200 p-4 text-center">
			{tokenData.TotalItems}
		</div>
	</div>
	<!-- <div
		class="flex items-center justify-center border-2 border-dashed border-black bg-gray-50 py-1 text-center text-7xl font-bold"
	>
		{tokenData.TokenNo}
	</div> -->
	<Button onclick={giveBack} class="mt-4 w-full">Give Back</Button>
	<Button variant="ghost" onclick={dispute} class="mt-4 w-full">
		<span class="text-red-500">Dispute</span>
	</Button>
	<!-- <ul class="m-0 hidden list-none flex-col divide-y border p-0 text-sm">
		<li>
			<input type="hidden" name="TokenNo" value={tokenData.TokenNo} />
		</li>
	</ul> -->
</div>
