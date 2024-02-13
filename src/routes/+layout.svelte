<script>
	import '../app.pcss';
	import Footer from '$lib/components/seva/Footer.svelte';
	import Nav from '$lib/components/seva/Nav.svelte';
  import { Button } from "$lib/components/ui/button";
	import { goto } from '$app/navigation';
</script>

<main class="mx-auto flex min-h-screen w-full max-w-md flex-col justify-between border-l border-r">
	<div class="h-full">
		<!-- Nav -->

		<Nav />

		<div class="my-2 justify-center grid gap-2 grid-cols-5">
			<Button variant="secondary" on:click="{()=>goto("/collect3/step1")}">Step1</Button>
			<Button variant="secondary" on:click="{()=>goto("/collect3/step2")}">Step2</Button>
			<Button variant="secondary" on:click="{()=>goto("/collect3/step3")}">Step3</Button>
			<Button variant="secondary" on:click="{()=>goto("/collect3/step4")}">Step4</Button>
			<Button variant="secondary" on:click="{()=>goto("/preview")}">Preview</Button>
		</div>
		<div class="flex-1 py-1">
			<slot />
		</div>
	</div>

	<!-- Footer -->

	<Footer />
</main>
