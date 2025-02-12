<script lang="ts">
	// import { goto } from '$app/navigation'
	// import axios from 'axios'
	// import { getContext } from 'svelte'
	// import { toast } from 'svelte-sonner'
	// const userStore = getContext('user')

	// let isLoading = $state(false)
	import { getUserState } from '$lib/user.svelte'
	const userStore = getUserState()
	async function logout() {
		userStore.logout()
	}
</script>

<div class="hero mt-2 grid text-center text-5xl font-bold">
	<a class="section banner food blue-card block" href="/collect3/step1">
		<!-- <img src="/food-tray.svg" class="w-32" alt="" /> -->
		<h1>Collect</h1>
		<!-- <div>Misiki Food Delivery</div> -->
	</a>
	<a class="section banner travel red-card block" href="/give-back">
		<!-- <img src="/cab.svg" class="w-32" alt="" /> -->
		<h1>Give Back</h1>
		<!-- <div>Misiki Taxi</div> -->
	</a>
</div>
<br />
<br />
<div class="flex justify-center text-center">
	<button class="text-xl hover:underline" onclick={logout}> Logout </button>
</div>

<style>
	.banner {
		margin: 10px;
		padding: 3rem;
		border-radius: 3px;
		color: #fff;
	}
	.yellow-card {
		box-shadow: 10px 10px 30px -15px #c7581d;
		background: linear-gradient(87deg, #e48c3a 0, #eb6e2b 100%);
		border-color: #69beda;
		color: #fff;
	}
	.blue-card {
		box-shadow: 10px 10px 30px -15px #1c45da;
		background: linear-gradient(87deg, #40c8fb 0, #1c45da 100%);
		border-color: #69beda;
		color: #fff;
	}
	.red-card {
		box-shadow: 10px 10px 30px -15px #da1c5f;
		background: linear-gradient(87deg, #fb6340 0, #da1c5f 100%);
		border-color: #fb6340;
		color: #fff;
	}
	.yellow-card:hover {
		box-shadow: 10px 10px 30px -15px #c7581d;
		background: linear-gradient(87deg, #eb6e2b 0, #e48c3a 100%);
		border-color: #69beda;
		color: #fff;
	}
	.blue-card:hover {
		box-shadow: 10px 10px 30px -15px #1c45da;
		background: linear-gradient(87deg, #1c45da 0, #40c8fb 100%);
		border-color: #69beda;
		color: #fff;
	}
	.red-card:hover {
		box-shadow: 10px 10px 30px -15px #da1c5f;
		background: linear-gradient(87deg, #da1c5f 0, #fb6340 100%);
		border-color: #fb6340;
		color: #fff;
	}
</style>
