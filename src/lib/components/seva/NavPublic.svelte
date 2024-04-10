<script>
	import { Home } from 'radix-icons-svelte'
</script>

<nav class="sticky inset-x-0 top-0 z-40 flex items-center justify-between border-b bg-white p-3">
	<div class="flex h-12 items-center justify-between">
		<a href="/" class="ml-4 flex items-center justify-end pr-2 text-center">
			<Home class="h-6 w-6" />
		</a>
	</div>
	<div class="flex items-center">
		<a href="/auth/signup" class=" px-1">SignUp</a>
		<a href="/auth/login" class=" truncate px-1 text-right text-gray-600">Login</a>
	</div>
</nav>
