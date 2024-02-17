<script lang="ts">
	export let data;
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
						{key.replace(/_/g, ' ')}
					</th>
				{/each}
			</tr>
		</thead>

		<tbody>
			{#each data.result as item, ix}
				<tr class="border-b border-gray-200">
					{#each Object.values(item) as value, vx}
						<th
							scope="row"
							class=" whitespace-nowrap px-6 py-4 font-normal
							{vx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}"
						>
							{value || '_'}
						</th>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
</div>
