<script lang="ts">
    const handleFileDrop = (event: DragEvent) => {
        event.preventDefault();

        const files = event.dataTransfer?.files;
        const fileInput = document.getElementById('file-dropper') as HTMLInputElement;

        if (files && fileInput) {
            fileInput.files = files;
        }
    }
</script>

<div
    class="h-2/6 w-7/12 max-md:w-9/12 max-sm:w-11/12 border-5 border-dashed border-neutral rounded-2xl flex flex-col justify-center items-center gap-4 p-4"
    on:drop={handleFileDrop}
    on:dragover={(event) => event.preventDefault()}
    role="form"
>
    <label for="file-dropper" class="text-xl max-md:text-lg max-sm:text-sm font-semibold">
        Drag & drop or browse files
    </label>
    <input
        type="file"
        id="file-dropper"
        name="files[]"
        class="file-input file-input-bordered file-input-neutral max-lg:w-11/12 max-md:file-input-sm"
        accept="image/*,.png,.jpg,.jpeg,.gif"
        multiple
    />
</div>



<style>
    @media (max-width: 768px) {
        .h-2\/6 {
            height: 50%;
        }
    }
</style>

