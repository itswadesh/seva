<script lang="ts">
	export let data
	// console.log('zzzzzzzzzzzzzzzzzz', data);
</script>

<div class="relative h-[75vh] overflow-x-auto border shadow-md sm:rounded-lg">
	<table class="w-full text-left text-xs rtl:text-right">
		<thead class="whitespace-nowrap uppercase">
			<tr>
				{#each Object.keys(data.result[0]) as key, dx}
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
			{#each data.result as item, ix}
				<tr class="border-b border-gray-200">
					{#each Object.entries(item) as [key, value], vx}
						<th scope="row" class={vx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
							<div class="max-w-60 truncate whitespace-pre-wrap px-6 py-4 font-normal">
								{#if key === 'CollectSangatFaceImage' || key === 'ItemsImageBack' || key === 'ItemsImageFront'}
									{#if value}
										<img src={value} alt={value} class="h-20 w-20 object-contain object-left" />
									{:else}
										-
									{/if}
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
