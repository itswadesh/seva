<script lang="ts">
	import '../app.pcss'
	import { Button } from '$lib/components/ui/button'
	import { goto } from '$app/navigation'
	import { page } from '$app/stores'
	import Footer from '$lib/components/seva/Footer.svelte'
	import Nav from '$lib/components/seva/Nav.svelte'
</script>

<main
	class="mx-auto flex min-h-screen w-full flex-col justify-between border-l border-r
	{$page.url?.pathname === '/admin' ? 'max-w-full' : ' max-w-md'}"
>
	<div class="h-full">
		<!-- Nav -->

		<Nav />

		<div class="flex-1 px-3 py-1">
			<slot />
		</div>
	</div>

	<!-- Footer -->

	<Footer />
</main>
