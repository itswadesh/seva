<script>
	export let data;
</script>

{#each data.result as i}
	{i.comment}
{/each}
