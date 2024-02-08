<script lang="ts">
    import { enhance } from '$app/forms';
    import { updateStore } from '$lib/store/collectionStore';
    import { Html5Qrcode } from 'html5-qrcode';
    import { onMount } from 'svelte';
    import { navigate } from 'svelte-routing';

    let scanning = false;

    let html5Qrcode: Html5Qrcode;

    onMount(() => {
        initScanner();
    });

    function initScanner() {
        html5Qrcode = new Html5Qrcode('reader');
        start();
    }

    function start() {
        html5Qrcode.start(
            { facingMode: 'environment'  }, // Use "environment" for the rear camera
            {
                fps: 10,
                qrbox: { width: 250, height: 250 }
            },
            onScanSuccess,
            onScanFailure
        );
        scanning = true;
    }

    async function stop() {
        await html5Qrcode.stop();
        scanning = false;
    }

    async function onScanSuccess(decodedText: any, decodedResult: any) {
        let getStoreValue = decodedText;
        const updatedState = {
            TokenNo: decodedText
        }
        updateStore(updatedState)
        console.log(decodedResult);
        stop();

        const form = document.getElementById('scan') as HTMLFormElement;
        if (form) form.submit();

        navigate('/collect');
        
    }

    function onScanFailure(error: any) {
        console.warn(`Code scan error = ${error}`);
    }
</script>

<main>
    <reader id="reader" />
    {#if scanning}
        <button on:click={stop}>stop</button>
    {:else}
        <button on:click={start}>start</button>
    {/if}

    <form
        action="/scan"
        method="POST"
        id="scan"
        use:enhance={() => {
            return async (result) => {
                console.log('result', result);
            };
        }}
    ></form>
</main>

<style>
    main {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 20px;
    }
    reader {
        width: 100%;
        min-height: 500px;
        background-color: black;
    }
</style>

