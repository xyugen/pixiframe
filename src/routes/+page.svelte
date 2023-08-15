<script>
	import FileDropper from "$lib/components/fileDropper.svelte";
	import { droppedFiles } from "$lib/stores";

    let steps = 2, currentStep = 1;

    let hasDroppedFiles = false;
    $: {
        hasDroppedFiles = $droppedFiles.length > 0;
    }
</script>

<form class="h-full w-full flex justify-center">
    <form class="h-full flex flex-col items-center justify-center w-7/12 max-md:w-9/12 max-sm:w-11/12 gap-4">
        {#if currentStep === 1}
            <FileDropper />
            <input type="button" class="btn btn-neutral w-full" disabled={!hasDroppedFiles} value="Next" on:click={() => currentStep++} />
        {:else if currentStep === 2}
            <input type="submit" class="btn btn-neutral w-full" value="Submit" />
        {/if}
    </form>
</form>
