<script lang="ts">
    import { droppedFiles } from "$lib/stores";

    const maxFileSize = 5 * 1024 * 1024;

    const handleFileDrop = (dragEvent: DragEvent) => {
        dragEvent.preventDefault();
        const files = dragEvent.dataTransfer?.files;
        const fileInput = document.getElementById('file-dropper') as HTMLInputElement;

        if (files && fileInput) {
            fileInput.files = files;
            droppedFiles.set(Array.from(files));
        }
    }

    const handleFileChange = (inputEvent: Event) => {
        inputEvent.preventDefault();
        const files = (inputEvent.target as HTMLInputElement).files;
        const fileInput = document.getElementById('file-dropper') as HTMLInputElement;

        if (files && fileInput) {
            droppedFiles.set(Array.from(files));
        }
    }
</script>


<div
    class="h-2/5 max-sm:h-2/6 w-full border-5 border-dashed border-neutral rounded-2xl flex flex-col justify-center items-center gap-1 p-4"
    on:drop={handleFileDrop}
    on:dragover={(event) => event.preventDefault()}
    role="form"
>
    <label for="file-dropper" class="text-xl max-md:text-lg max-sm:text-sm font-semibold mb-3">
        Drag & drop or browse files <br />
    </label>
    <input
        type="file"
        id="file-dropper"
        name="files"
        class="file-input file-input-bordered file-input-neutral max-lg:w-11/12 max-md:file-input-sm"
        accept="image/*.,.png,.jpg,.jpeg,.gif"
        size={maxFileSize}
        on:change={handleFileChange}
        multiple
    />
    <label for="file-dropper" class="text-center text-sm">5MB max</label>
</div>

