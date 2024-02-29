<script context="module">
	import Step1 from './step1/+page.svelte'

	export async function load({ fetch }) {
		// Load the initial data or perform any setup here
		return { data: {} }
	}
</script>

<h1>Welcome</h1>

<p>This is a multi-step form example using SvelteKit.</p>

<Step1 />
