<script lang="ts">
	import SeatLayout from './SeatLayout.svelte'
	let selectedSeats: any = []
</script>

<SeatLayout rows={10} seatsPerRow={15} bind:selectedSeats />

<p>Selected seats: {selectedSeats.join(', ')}</p>
