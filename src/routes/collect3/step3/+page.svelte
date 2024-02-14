<script lang="ts">
	import { goto } from '$app/navigation';
	import { updateStore } from '$lib/store/collectionStore';
	import Button from '$lib/components/ui/button/button.svelte';

	let capturedItemImageUrl1;
	let capturedItemImageUrl2;
	let data;

	const handleChangeItemImageSaved1 = (e: any) => {
		capturedItemImageUrl1 = URL.createObjectURL(e.target.files[0]);

		const updatedState = {
			ItemsImageFront: capturedItemImageUrl1
		};

		updateStore(updatedState);
	};

	const handleChangeItemImageSaved2 = (e: any) => {
		capturedItemImageUrl2 = URL.createObjectURL(e.target.files[0]);

		const updatedState = {
			ItemsImageBack: capturedItemImageUrl2
		};

		updateStore(updatedState);
	};
</script>

<form>
	<h1 class="mb-10 text-center text-xl font-bold underline underline-offset-8">
		Upload Products Photo
	</h1>

	<div class="flex flex-col gap-5">
		<div class="flex flex-col gap-2">
			<input
				type="file"
				name="image"
				accept="image/*"
				capture="environment"
				on:change={handleChangeItemImageSaved1}
			/>

			<input
				type="file"
				name="image"
				accept="image/*"
				capture="environment"
				on:change={handleChangeItemImageSaved2}
			/>
		</div>

		<Button variant="default" class="w-full" href="/collect3/step4">Proceed To Scan Token</Button>
	</div>
</form>
