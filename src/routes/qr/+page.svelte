<script>
	import { onMount } from 'svelte'
	let QR = $state()
	onMount(async () => {
		const QRModule = await import('./QrScan.svelte')
		QR = QRModule.default
	})
</script>

<QR />
