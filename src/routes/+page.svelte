<script lang="ts">
	import UploadForm from "$lib/components/uploadForm.svelte";
    import type { ActionData } from './$types';

    let form: ActionData;

    const closeToast = (event: Event) => {
        const button = event.target as HTMLButtonElement;
        button.parentElement?.parentElement?.remove();
    }
</script>

<svelte:head>
    <title>PixiFrame</title>
</svelte:head>

<div class="h-full w-full flex justify-center">
    <UploadForm />
    {#if form?.error}
        <div class="toast toast-top toast-center">
            <div class="alert alert-error relative">
                <button class="absolute right-1 hover:bg-primary h-5 w-5 rounded-full top-1 flex items-center justify-center" on:click={closeToast}>
                    <svg class="w-3 fill-neutral" xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path d="m249-183-66-66 231-231-231-231 66-66 231 231 231-231 66 66-231 231 231 231-66 66-231-231-231 231Z"/></svg>
                </button>
                <span>{form.error}</span>
            </div>
        </div>
    {/if}
</div>
