<script>
	import Button from '$lib/components/misiki/button/button.svelte'
</script>

<div class="flex items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
	<div class="w-full text-center">
		<h1 class="mb-6 text-center text-4xl font-bold text-green-500">Registration successful.</h1>
		<p class="text-2xl text-red-500">Please wait for Activation and Seva Allotment.</p>
		<a href="/auth/login">
			<Button class="mt-8 bg-blue-500 p-12 text-3xl">Go to Login Page</Button>
		</a>
	</div>
</div>
