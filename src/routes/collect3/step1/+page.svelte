<script lang="ts">
 import { goto } from '$app/navigation';
	import Button from '$lib/components/ui/button/button.svelte';
	import { collectionstore, updateStore } from '$lib/store/collectionStore';
	let capturedImageURI: string;

let data={}

  function nextStep() {
    updateStore(data)
    goto('/collect3/step2');
  }
  
	const handleChangeImageSaved = (e: any) => {
		capturedImageURI = URL.createObjectURL(e.target.files[0]);
		console.log(capturedImageURI);
	};

</script>

<h1>Step 1</h1>
<div>
		
				<input
					type="file"
					name="image"
					accept="image/*"
					capture="environment"
					on:change={handleChangeImageSaved}
				/>
	</div>
<button on:click={nextStep}>Next</button>
