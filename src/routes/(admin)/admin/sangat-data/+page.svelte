<script lang="ts">
	import { date, dateOnly } from '$lib/utils'

	interface Props {
		data: any
	}

	let { data }: Props = $props()
	const sangatData = JSON.parse(data.sangatData) || []
</script>

<div class="flex items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
	<div class="w-full text-center">
		<h1 class="mb-6 text-center text-2xl font-bold">Sangat Data</h1>
		{#if sangatData.length === 0}
			No Sangat data collected yet
		{:else}
			<div class="relative h-[75vh] overflow-x-auto border text-black shadow-md sm:rounded-lg">
				<table class="w-full text-left text-xs rtl:text-right">
					<thead class="whitespace-nowrap uppercase">
						<tr>
							{#each Object.keys(sangatData[0]) as key, dx}
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
						{#each sangatData as item, ix}
							<tr class="border-b border-gray-200 text-black">
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
											{:else if key === 'createdAt'}
												{date(value as string)}
											{:else if key === 'updatedAt'}
												{date(value as string)}
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
