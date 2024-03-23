<!-- Seat.svelte -->
<script>
	import { createEventDispatcher } from 'svelte'

	export let id
	export let row = 1
	export let seat = 1
	export let isSelected = false

	const dispatch = createEventDispatcher()
</script>

<button class="seat" class:selected={isSelected} on:click={() => dispatch('click')}>
	{+row + 1}{+seat + 1}
</button>

<style>
	.seat {
		width: 30px;
		height: 30px;
		background-color: #ccc;
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
	}

	.selected {
		background-color: #4caf50;
		color: white;
	}
</style>
