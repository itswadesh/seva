<script lang="ts">
	export let data
</script>

{#if data?.movies}
	{#each data.movies as movie}
		{movie}
	{/each}
{/if}
