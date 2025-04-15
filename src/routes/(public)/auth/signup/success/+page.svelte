<script lang="ts">
	import Button from '$lib/components/misiki/button/button.svelte'
	interface Props {
		data?: any
	}

	let { data = {} }: Props = $props()
</script>

<div class="flex items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
	<div class="w-full text-center">
		<h1 class="mb-6 text-center text-4xl font-bold text-green-500">
			Registration successful and this is your ID: <span
				class="rounded bg-yellow-200 p-1 text-yellow-700 shadow-md">{data?.id}</span
			>
		</h1>
		<p class="text-2xl text-red-500">Please remember your ID for further communication</p>
		<a href="/auth/login">
			<Button class="mt-8 bg-blue-500 p-12 text-3xl">Go to Login Page</Button>
		</a>
	</div>
</div>
