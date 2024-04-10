<script lang="ts">
	import '../app.pcss'
	import { page } from '$app/stores'
	import Footer from '$lib/components/seva/Footer.svelte'
	import { fade, fly } from 'svelte/transition'
	export let data
</script>

<svelte:head>
	<link
		href="https://fonts.googleapis.com/css2?family=Karla:wght@100;200;300;400;500;600;700;800;900&display=swap"
		rel="stylesheet"
	/>
</svelte:head>
<main
	class="mx-auto flex min-h-screen w-full flex-col justify-between border-l border-r
	{$page.url?.pathname === '/admin' ? 'max-w-full' : ' max-w-md'}"
>
	<div class="h-full">
		<div class="flex-1 px-3 py-1">
			{#key data.url}
				<div in:fly={{ y: -50, duration: 100 }} out:fade={{ duration: 100 }} class="">
					<slot />
				</div>
			{/key}
		</div>
	</div>

	<Footer />
</main>
