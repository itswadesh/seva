<script>
	import '../app.pcss';
	import Footer from '$lib/components/seva/Footer.svelte';
	import Nav from '$lib/components/seva/Nav.svelte';
</script>

<main class="mx-auto flex min-h-screen w-full max-w-md flex-col justify-between border-l border-r">
	<div class="h-full">
		<!-- Nav -->

		<Nav />

		<div class="flex-1 px-3 py-5 sm:p-10">
			<slot />
		</div>
	</div>

	<!-- Footer -->

	<Footer />
</main>
