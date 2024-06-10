<script lang="ts">
	import '../../app.pcss'
	import { Button } from '$lib/components/ui/button'
	import { goto } from '$app/navigation'
	import { page } from '$app/stores'
	import Footer from '$lib/components/seva/Footer.svelte'
	import Nav from '$lib/components/seva/Nav.svelte'
	import { fade, fly } from 'svelte/transition'
	import { cn } from '$lib/utils'
	import { Home } from 'radix-icons-svelte'

	export let data
</script>

<main
	class="mx-auto flex min-h-screen w-full flex-col justify-between
"
>
	<div class="h-full">
		<nav class="flex justify-center {cn('flex items-center space-x-4 lg:space-x-6')}">
			<a href="/" class="ml-4 flex items-center justify-end pr-2 text-center">
				<Home class="h-6 w-6" />
			</a>
			<a href="/admin/users" class="text-sm font-medium transition-colors hover:text-primary">
				Users
			</a>
			<a
				href="/admin/programs"
				class="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
			>
				Programs
			</a>
			<a
				href="/admin/sangat-data"
				class="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
			>
				Sangat Data
			</a>

			<a
				href="/admin/login-requests"
				class="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
			>
				Login Requests
			</a>
		</nav>

		<div class="flex-1 px-3 py-1">
			{#key data.url}
				<div in:fly={{ y: -50, duration: 100 }} out:fade={{ duration: 100 }} class="">
					<slot />
				</div>
			{/key}
		</div>
	</div>
</main>
