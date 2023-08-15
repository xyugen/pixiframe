<script lang="ts">
    import FileDropper from "$lib/components/fileDropper.svelte";
    import { droppedFiles } from "$lib/stores";

    let currentStep = 1;

    let hasDroppedFiles = false;
    $: {
        hasDroppedFiles = $droppedFiles.length > 0;
    }

    let encryptionOption = "none";
    let encryptionPassword = "";
</script>

<form class="h-full w-7/12 max-md:w-9/12 max-sm:w-11/12" method="post" action="?/upload">
    <!-- FILE DROPPER -->
    <div class="h-full w-full flex flex-col items-center justify-center gap-4 {currentStep === 1 ? '' : 'hidden'}">
        <FileDropper />
        <input
            type="button"
            class="btn btn-neutral w-full"
            disabled={!hasDroppedFiles}
            value="Next"
            on:click={() => currentStep++}
        />
    </div>
    <!-- UPLOAD -->
    <div class="h-full w-full flex flex-col items-center justify-center gap-4 {currentStep === 2 ? '' : 'hidden'}">
        <div class="w-full flex flex-col gap-5">
            <div class="w-full flex flex-row justify-between">
                <h2 class="text-2xl max-sm:text-xl font-semibold">Encryption:</h2>
                <div class="form-control flex flex-row">
                    <label class="label cursor-pointer space-x-2">
                        <input
                            type="radio"
                            name="encryption"
                            id="encryption-none"
                            class="radio"
                            value="none"
                            checked
                            bind:group={encryptionOption}
                        />
                        <span class="label-text">None</span>
                    </label>
                    <label class="label cursor-pointer space-x-2">
                        <input
                            type="radio"
                            name="encryption"
                            id="encryption-password"
                            class="radio"
                            value="password"
                            bind:group={encryptionOption}
                        />
                        <span class="label-text">Password</span>
                    </label>
                </div>
            </div>
            {#if encryptionOption === "password"} 
                <div class="form-control w-full">
                    <input
                        type="password"
                        placeholder="Password"
                        class="input input-bordered w-full"
                        bind:value={encryptionPassword}
                        required
                    />
                </div>
            {/if}
        </div>
        <div class="flex flex-row w-full gap-3">
            <button
                class="btn flex-1"
                on:click={() => {currentStep--; hasDroppedFiles = false}}
            >
                Back
            </button>
            <input
                type="submit"
                class="btn btn-neutral flex-1"
                value="Submit"
                disabled={encryptionOption === "password" && encryptionPassword.trim() === ""}
            />
        </div>
    </div>
</form>