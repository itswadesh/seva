<script lang="ts">
	import { date, dateOnly } from '$lib/utils'
	import { Checkbox } from '$lib/components/ui/checkbox/index'
	// import * as Select from '$lib/components/ui/select/index'
	import Select from '$lib/components/Select.svelte'

	import axios from 'axios'
	import { toast } from 'svelte-sonner'
	export let data
	const roles = [
		{ name: 'DEMO', value: 'DEMO' },
		{ name: 'LIVE', value: 'LIVE' }
	]

	const programs = JSON.parse(data.programs || '[]') || []
</script>

<div class="flex items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
	<div class="w-full text-center">
		<h1 class="mb-6 text-center text-2xl font-bold">Programs</h1>
		{#if programs.length === 0}
			No program found
		{:else}
			<div class="relative h-[75vh] overflow-x-auto border shadow-md sm:rounded-lg">
				<table class="w-full text-left text-xs rtl:text-right">
					<thead class="whitespace-nowrap uppercase">
						<tr>
							{#each Object.keys(programs[0]) as key, dx}
								<th
									scope="col"
									class="px-6 py-3
						{dx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}"
								>
									{key.replace(/_/g, ' ').replace(/([a-z])([A-Z])/g, '$1 $2')}
								</th>
							{/each}
						</tr>
					</thead>

					<tbody>
						{#each programs as item, ix}
							<tr class="border-b border-gray-200">
								{#each Object.entries(item) as [key, value], vx}
									<th scope="row" class={vx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
										<div class="max-w-60 truncate whitespace-pre-wrap px-6 py-4 font-normal">
											{#if key === 'CollectSangatFaceImage' || key === 'ItemsImageBack' || key === 'ItemsImageFront'}
												{#if value}
													<img
														src={value}
														alt={value}
														class="h-20 w-20 object-contain object-left"
													/>
												{:else}
													-
												{/if}
											{:else if key === 'dob' || key === 'startDate' || key === 'compDate'}
												{dateOnly(value)}
											{:else if key === 'approved_at'}
												{date(value)}
											{:else if key === 'category'}
												<div class="flex items-center space-x-2">
													<Select
														title="Select category"
														{value}
														data={roles || []}
														on:value={async ({ detail }) => {
															// selectedRole = detail
															try {
																await axios.post('/api/admin/programs', {
																	id: item.id,
																	category: detail
																})
																toast.success(`Category changed`)
															} catch (e) {
																toast.error(e.response.data)
															}
														}}
													/>
												</div>
											{:else if key === 'active'}
												<div class="flex items-center space-x-2">
													<Checkbox
														id="terms"
														checked={value}
														onCheckedChange={async (v) => {
															try {
																const res = await axios.post('/api/admin/programs', {
																	id: item.id,
																	active: v
																})
															} catch (e) {
																toast.error(e.response.data)
															}
														}}
													/>
												</div>
											{:else}
												{value || '_'}
											{/if}
										</div>
									</th>
								{/each}
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		{/if}
	</div>
</div>
