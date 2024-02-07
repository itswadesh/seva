<script>
	import { Button } from "$lib/components/ui/button";
</script>

<main class="flex flex-col items-center justify-center">
	<h1 class="text-4xl font-semibold mb-8 text-center">
	  Welcome to the Seva Portal
	</h1>
	<p class="text-lg text-center mb-8">Providing essential services for all citizens</p>
	<div class="flex items-center">
		<Button href="/collect" class="mr-4">
			Collect Now
		</Button>
		<a href="/services" class="text-sm text-gray-600 underline">View Our Services</a>
	</div>
</main>
