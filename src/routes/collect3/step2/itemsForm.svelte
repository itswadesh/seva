<script lang="ts">
	import { formSchema, type FormSchema } from './schema';
	import { goto } from '$app/navigation';
	import { Input } from '$lib/components/ui/input';
	import { updateStore } from '$lib/store/collectionStore';
	import * as Form from '$lib/components/ui/form';
	import Button from '$lib/components/ui/button/button.svelte';
	import type { SuperValidated } from 'sveltekit-superforms';

	// export let form: SuperValidated<FormSchema>;
	export let data = {};

	const save = () => {
		let total_no_of_items = 0;

		for (const key in data) {
			if (data[key] == undefined || data[key] == null || data[key] == '') {
				total_no_of_items += 0;
			} else total_no_of_items += Number(data[key]);
		}

		data.TotalItems = total_no_of_items;

		updateStore(data);
		goto('/collect3/step3');
	};
</script>

<form method="POST" on:submit|preventDefault={save} class="flex flex-col gap-5">
	<div class="flex flex-col gap-2">
		<Input bind:value={data.Mobiles} placeholder="Mobile" type="number" min="0" />

		<Input bind:value={data.EarPhone} placeholder="Earphones" type="number" min="0" />

		<Input bind:value={data.EarPod} placeholder="Earpods" type="number" min="0" />

		<Input bind:value={data.Charger} placeholder="Charger" type="number" min="0" />

		<Input bind:value={data.SmartWatch} placeholder="Smartwatch" type="number" min="0" />

		<Input bind:value={data.Others} placeholder="Others" type="number" min="0" />
	</div>

	<Button type="submit" class="w-full">Submit</Button>
</form>
