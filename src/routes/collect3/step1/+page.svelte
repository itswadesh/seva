<script lang="ts">
	import { collectionstore, updateStore } from '$lib/store/collectionStore';
	import { goto } from '$app/navigation';
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';

	let capturedImageURI: string;

	let data = {};

	function nextStep() {
		updateStore(data);
		goto('/collect3/step2');
	}

	const handleChangeImageSaved = (e: any) => {
		capturedImageURI = URL.createObjectURL(e.target.files[0]);

		const updatedState = {
			CollectSangatFaceImage: capturedImageURI
		};

		updateStore(updatedState);
	};
</script>

<div>
	<h1 class="mb-10 text-center text-xl font-bold underline underline-offset-8">
		Take Visitor Photo
	</h1>

	<form on:submit|preventDefault={nextStep} class="flex flex-col gap-5">
		<div class="flex flex-col gap-2">
			<input
				type="file"
				name="image"
				accept="image/*"
				capture="environment"
				on:change={handleChangeImageSaved}
			/>
		</div>

		<Button type="submit" class="w-full">Submit</Button>
	</form>
</div>
