<script lang="ts">
	import { browser } from '$app/environment'
	import { clearStore, collectionstore } from '$lib/store/collectionStore'
	import { enhance } from '$app/forms'
	import { goto } from '$app/navigation'
	import { onMount } from 'svelte'
	import { toast } from 'svelte-sonner'
	import Button from '$lib/components/misiki/button/button.svelte'
	import { page } from '$app/state'
	import { getStepState } from '$lib/steps.svelte'
	const stepState = getStepState()
	let formData: any = $state({})
	let loading = $state(false)
	let total = $state(0)
	const me = $derived(JSON.parse(page.data.me || '{}'))
	const getTotalitems = () => {
		total =
			+(stepState.items.Bag || 0) +
			+(stepState.items.Charger || 0) +
			+(stepState.items.EarPhone || 0) +
			+(stepState.items.EarPod || 0) +
			+(stepState.items.Laptop || 0) +
			+(stepState.items.Mobiles || 0) +
			+(stepState.items.Others || 0) +
			+(stepState.items.SmartWatch || 0) +
			+(stepState.items.PowerBank || 0)
		return total
	}

	onMount(() => {
		if (browser) {
			collectionstore.subscribe((value) => {
				if (value) {
					formData = value
					getTotalitems()
				}
			})
		}
	})
</script>

<div>
	<form
		method="POST"
		class="flex flex-col gap-5"
		use:enhance={() => {
			loading = true
			return async ({ result }) => {
				if (result?.status === 404 && result?.data?.message) {
					loading = false
					return toast.error(result?.data?.message)
				}
				if (result?.data?.isRedirect) {
					goto(
						`/collect3/step4?token_no=${page.url.searchParams.get('token_no') || ''}&message=${result?.data?.message}`
					)
				} else {
					loading = false
					if (result?.status === 200) {
						stepState.clearItems()
						goto(`/collect3/step1?token_no=${page.url.searchParams.get('token_no') || ''}`)
					} else {
						toast.error('Something went wrong', {
							description: result?.error?.message,
							action: {
								label: 'Ok',
								onClick: () => console.log('Ok')
							}
						})
					}
				}
			}
		}}
	>
		<div class="grid grid-cols-1">
			<img
				src={`/uploads/${stepState.getSangatFaceImage({
					programId: page.data?.programData?.ProgramID,
					sewadarId: me.id,
					tokenNo: page.url.searchParams.get('token_no') || ''
				})}`}
				alt="Sangat face missing"
				class="w-full object-contain object-left"
			/>
		</div>
		<div class="flex items-center gap-5 text-3xl font-bold">
			<div class="w-full bg-gray-200 px-4">Total Items</div>
			<div class="w-32 bg-gray-200 px-4 text-center">
				{total}
			</div>
		</div>
		<!-- <div
			class="flex items-center justify-center border-2 border-dashed border-black bg-gray-50 py-1 text-center text-7xl font-bold"
		>
			{page.url.searchParams.get('token_no')}
		</div> -->
		<ul class="m-0 hidden list-none flex-col divide-y border p-0 text-sm">
			{#each Object.entries(stepState.items) as [key, value], index}
				<li
					class="grid grid-cols-2 items-center
					{index % 2 === 0 ? 'bg-white' : 'bg-secondary'}"
				>
					<div class="col-span-1 flex items-center justify-between gap-2 p-2">
						<span class="capitalize">
							{key.replace(/_/g, ' ').replace(/([a-z])([A-Z])/g, '$1 $2')}
						</span>

						<span> : </span>
					</div>

					<div class="col-span-1 p-2 font-semibold">
						{#if key === 'CollectSangatFaceImage' || key === 'ItemsImageBack' || key === 'ItemsImageFront'}
							<img
								src={`/uploads/${value}`}
								alt={key.replace(/_/g, ' ').replace(/([a-z])([A-Z])/g, '$1 $2')}
								class="h-20 w-auto object-contain object-left"
							/>
						{:else}
							{value || '-'}
						{/if}
					</div>
					{#if key != 'CollectSangatFaceImage' && key != 'ItemsImageBack' && key != 'ItemsImageFront'}
						<input type="hidden" name={key} {value} />
					{/if}
				</li>
			{/each}
			<input type="hidden" name="TokenNo" value={page.url.searchParams.get('token_no') || ''} />
			<input type="hidden" name="Collect_SewadarID" value={me.id} />
		</ul>

		<Button
			type="submit"
			class="border border-green-700 bg-green-500 py-8 text-3xl font-bold shadow"
			{loading}
		>
			Submit
		</Button>
		<div class="flex flex-col items-center gap-4">
			{#if !stepState.getItemsImage( { programId: page.data?.programData?.ProgramID, sewadarId: me.id, tokenNo: page.url.searchParams.get('token_no') || '', type: 'front' } )}
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
					src={`/uploads/${stepState.getItemsImage({
						programId: page.data?.programData?.ProgramID,
						sewadarId: me.id,
						tokenNo: page.url.searchParams.get('token_no') || '',
						type: 'front'
					})}`}
					alt="Front image missing"
					class="w-full object-contain object-left"
				/>
			{/if}
			{#if !stepState.getItemsImage( { programId: page.data?.programData?.ProgramID, sewadarId: me.id, tokenNo: page.url.searchParams.get('token_no') || '', type: 'front' } )}
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
					src={`/uploads/${stepState.getItemsImage({
						programId: page.data?.programData?.ProgramID,
						sewadarId: me.id,
						tokenNo: page.url.searchParams.get('token_no') || '',
						type: 'back'
					})}`}
					alt="Back image missing"
					class="w-full object-contain object-left"
				/>
			{/if}
		</div>
	</form>
</div>
