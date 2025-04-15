<script>
	let me = $state('me')

	function increment() {
		me = 'me' + Math.random()
	}
</script>

<button onclick={increment}>
	clicks: {me}
</button>
