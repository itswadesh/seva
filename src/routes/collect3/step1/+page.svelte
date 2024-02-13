<script lang="ts">
 import { goto } from '$app/navigation';
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import { collectionstore, updateStore } from '$lib/store/collectionStore';
	let capturedImageURI: string;

let data={}

  function nextStep() {
    updateStore(data)
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

<h1 class="flex justify-center border-b font-bold text-xl">Take Visitor Photo</h1>
<form on:submit|preventDefault={nextStep}>
<div>
		
	<input
	type="file"
	name="image"
	accept="image/*"
	capture="environment"
	on:change={handleChangeImageSaved}
/>
	</div>
	<Button type="submit" class="w-full"  >Submit</Button>
</form>