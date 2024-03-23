<script lang="ts">
	import Card from '$lib/components/ui/card/card.svelte'

	export let data
</script>

{#if data?.data}
	{#each data.data as movie}
		<div>
			<Card class="w-[350px]">
				<img src={movie.img} alt="" />
			</Card>
		</div>
	{/each}
{/if}
