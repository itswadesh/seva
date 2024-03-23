<!-- SeatLayout.svelte -->
<script lang="ts">
	import Seat from './Seat.svelte'

	export let rows = ['A', 'B']
	export let seatsPerRow = 15
	export let selectedSeats = []

	let seats = []

	for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
		const row = rows[rowIndex]
		for (let seat = 0; seat < seatsPerRow; seat++) {
			seats.push({
				id: `${row}-${seat + 1}`,
				row,
				seat: seat + 1,
				isSelected: false
			})
		}
	}

	function toggleSeat(seatId: any) {
		seats = seats.map((seat: any) => {
			if (seat.id === seatId) {
				seat.isSelected = !seat.isSelected
				if (seat.isSelected) {
					selectedSeats = [...selectedSeats, seatId]
				} else {
					selectedSeats = selectedSeats.filter((id: any) => id !== seatId)
				}
			}
			return seat
		})
	}
</script>

<div class="seat-layout">
	{#each seats as seat (seat.id)}
		<Seat
			id={seat.id}
			row={seat.row}
			seat={seat.seat}
			isSelected={seat.isSelected}
			on:click={() => toggleSeat(seat.id)}
		/>
	{/each}
</div>

<style>
	.seat-layout {
		display: grid;
		grid-template-columns: repeat(15, 30px);
		grid-gap: 5px;
	}
</style>
