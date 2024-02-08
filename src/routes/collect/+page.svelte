<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { collectionstore } from '$lib/store/collectionStore';
	import ItemForm from './itemsForm.svelte';
	export let data;
	let capturedImageURI: string;
	let capturedItemImageUrl1: string;
	let capturedItemImageUrl2: string;
	let additemsCheck = false;
	let addItemImages = false;
	let scanQr = false;
	let totalItems = 0;
    
	const initialState = {
    ID: '',
    TokenNo: 0,
    Collect_SewadarID: '',
    Collect_SewadarName: '',
    Mobiles: 0,
    EarPhone: 0,
    EarPod: 0,
    PowerBank: 0,
    Charger: 0,
    SmartWatch: 0,
    Others:0,
    TotalItems: 0,
    CollectSangatFaceImage:'',
	ItemsImageBack: '',
    ItemsImageFront: '',
};

	const handleAddItems = () => {
		initialState.CollectSangatFaceImage = capturedImageURI;
		additemsCheck = !additemsCheck;
	};

	const handleChangeImageSaved = (e: any) => {
		capturedImageURI = URL.createObjectURL(e.target.files[0]);
	};
	const handleChangeItemImageSaved1 = (e: any) => {
		capturedItemImageUrl1 = URL.createObjectURL(e.target.files[0]);
        initialState.ItemsImageFront = capturedItemImageUrl1;
		collectionstore.update(() => initialState);
	};
	const handleChangeItemImageSaved2 = (e: any) => {
		capturedItemImageUrl2 = URL.createObjectURL(e.target.files[0]);
		initialState.ItemsImageFront = capturedItemImageUrl2;
		collectionstore.update(() => initialState);
	};

	const handleItemImages = () => {
		initialState.Mobiles = Number(data.form?.data?.mobile)
		initialState.EarPhone = Number(data.form?.data?.earphones)
		initialState.EarPod = Number(data.form?.data?.earpods)
		initialState.Charger = Number(data.form?.data?.charger)
		initialState.SmartWatch = Number(data.form?.data?.smartwatch)
		initialState.Others = Number(data.form?.data?.others)
		initialState.TotalItems = totalItems
		addItemImages = !addItemImages;
	};
</script>

<svelte:head>
	<title>Collect Items</title>
	<meta name="description" content="Collect Items" />
	<meta name="robots" content="noindex, nofollow" />
</svelte:head>

{#if !additemsCheck && !addItemImages && !scanQr}
	<main class="mt-12 flex flex-1 flex-col items-center justify-center">
		{#if !capturedImageURI}
            <input
                type="file"
                name="image"
                accept="image/*"
                capture="environment"
                on:change={handleChangeImageSaved}
            />
        {:else}
		<!-- svelte-ignore a11y-img-redundant-alt -->
		<img src={capturedImageURI} alt="Captured Image" class="h-64 w-64" />
		<Button variant="default" class="mt-4" on:click={handleAddItems}>Add Items</Button>
		{/if}
	</main>
{:else if additemsCheck && !addItemImages && !scanQr}
	<ItemForm form={data.form} />
	<Button variant="default" class="mt-4" on:click={handleItemImages}>Take Images</Button>
{:else}
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
	<Button variant="default" class="mt-4" href="/scan">Proceed To Scan QR</Button>
{/if}
