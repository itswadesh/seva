<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { collectionstore, updateStore } from '$lib/store/collectionStore';
	import ItemForm from './itemsForm.svelte';

	export let data;

	let addItemImages = false;
	let additemsCheck = false;
	let capturedImageURI: string;
	let capturedItemImageUrl1: string;
	let capturedItemImageUrl2: string;
	let scanQr = false;

	const initialState = {
		Charger: 0,
		Collect_SewadarID: '',
		Collect_SewadarName: '',
		CollectSangatFaceImage: '',
		EarPhone: 0,
		EarPod: 0,
		ID: '',
		ItemsImageBack: '',
		ItemsImageFront: '',
		Mobiles: 0,
		Others: 0,
		PowerBank: 0,
		SmartWatch: 0,
		TokenNo: 0,
		TotalItems: 0
	};

	const handleAddItems = () => {
		const updatedState = {
			CollectSangatFaceImage: capturedImageURI
		};
		updateStore(updatedState);
		additemsCheck = !additemsCheck;
	};

	const handleChangeImageSaved = (e: any) => {
		capturedImageURI = URL.createObjectURL(e.target.files[0]);
		console.log(capturedImageURI);
	};

	const handleChangeItemImageSaved1 = (e: any) => {
		capturedItemImageUrl1 = URL.createObjectURL(e.target.files[0]);
		console.log(capturedItemImageUrl1);
		const updatedState = {
			ItemsImageFront: capturedItemImageUrl1
		};
		updateStore(updatedState);
	};

	const handleChangeItemImageSaved2 = (e: any) => {
		capturedItemImageUrl2 = URL.createObjectURL(e.target.files[0]);
		console.log(capturedItemImageUrl2);
		const updatedState = {
			ItemsImageBack: capturedItemImageUrl2
		};
	};

	const handleItemImages = () => {
		addItemImages = !addItemImages;
	};
</script>

<svelte:head>
	<title>Collect Items</title>
	<meta name="description" content="Collect Items" />
	<meta name="robots" content="noindex, nofollow" />
</svelte:head>

{#if !additemsCheck && !addItemImages && !scanQr}
	<div>
		{#if !capturedImageURI}
			<div>
				<p class="mb-1">Please upload photo</p>

				<input
					type="file"
					name="image"
					accept="image/*"
					capture="environment"
					on:change={handleChangeImageSaved}
				/>
			</div>
		{:else}
			<div class="flex flex-col items-center justify-center gap-5">
				<!-- svelte-ignore a11y-img-redundant-alt -->
				<img src={capturedImageURI} alt="Captured Image" class="h-64 w-64" />

				<Button variant="default" class="w-full" on:click={handleAddItems}>Add Items</Button>
			</div>
		{/if}
	</div>
{:else if additemsCheck && !addItemImages && !scanQr}
	<div class="flex flex-col gap-5">
		<ItemForm form={data.form} />

		<Button variant="default" class="w-full" on:click={handleItemImages}>Take Images</Button>
	</div>
{:else}
	<div class="flex flex-col gap-5">
		<div class="flex flex-col gap-5">
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

		<Button variant="default" class="w-full" href="/scan">Proceed To Scan QR</Button>
	</div>
{/if}
