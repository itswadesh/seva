<script lang="ts">
	import '../app.pcss'
	import { page } from '$app/state'
	import Footer from '$lib/components/seva/Footer.svelte'
	import { fade, fly } from 'svelte/transition'
	import { Toaster } from '$lib/components/ui/sonner'
	import { ModeWatcher } from 'mode-watcher'

	// import { setContext } from 'svelte'
	// import createUserStore from '$lib/store/create-user-store'
	import { setStepState } from '$lib/steps.svelte'
	import { setUserState } from '$lib/user.svelte'
	setStepState()
	setUserState()

	let { data, children }: Props = $props()

	// In a real app, you would fetch the user data from an API
	// const userStore = createUserStore(JSON.parse(data?.me) || {})
	// setContext('user', userStore)
	// userStore.updateMe(JSON.parse(data.me))
</script>

<main
	class="mx-auto flex min-h-screen w-full flex-col justify-between
	{page.url?.pathname.startsWith('/admin') ? 'max-w-full' : ' max-w-md'}"
>
	<div class="h-full">
		<div class="flex-1 px-3 py-1">
			<ModeWatcher />
			<Toaster theme="light" richColors />

			{#key data.url}
				<div in:fly={{ y: -50, duration: 100 }} out:fade={{ duration: 100 }} class="">
					{@render children?.()}
				</div>
			{/key}
		</div>
	</div>

	<Footer />
</main>
