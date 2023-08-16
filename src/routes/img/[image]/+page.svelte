<script lang="ts">
	import type { PageData } from "./$types";
    import { page } from "$app/stores";
	import { getTimeAgo } from "$lib/utils/helpers";

    const highlight = (event: Event) => {
        const input = event.target as HTMLInputElement;
        if (input) input.select()
    }

    let linkCopied = 0;
    const copyToClipboard = (inputId: string) => {
        const input = document.getElementById(inputId) as HTMLInputElement;
        if (input) {
            input.select();
            navigator.clipboard.writeText(input.value);
           
            linkCopied++;
            setTimeout(() => {
                linkCopied--;
            }, 3000);
        }
    }

    export let data: PageData;
</script>

<svelte:head>
	<title>PixiFrame | {data.image?.name}</title>
</svelte:head>

<div
	class="w-full h-full flex max-sm:py-14 justify-center text-neutral-content"
>
	<div class="card h-fit w-11/12 bg-neutral shadow-xl">
		<figure class="px-10 pt-10 max-md:pt-3 max-md:px-3">
			<img
				alt={data.image?.description}
				src={data.image?.storage_url}
			/>
		</figure>
		<div class="card-body items-left text-left text-xl max-md:text-lg max-sm:text-sm">
			<div class="card-actions">
                <!-- FIXME: onclick -->
				<button class="btn btn-error text-error-content font-bold btn-sm" onclick="modal_delete.showModal()">Delete</button>
                <dialog id="modal_delete" class="modal modal-bottom sm:modal-middle">
                <form method="dialog" class="modal-box bg-warning text-warning-content">
                    <h3 class="font-bold text-lg">Delete image?</h3>
                    <p class="py-4">Are you sure you want to delete this image?</p>
                    <div class="modal-action">
                    <!-- if there is a button in form, it will close the modal -->
                    <button class="btn border-0 font-bold bg-error text-error-content hover:bg-error-content hover:text-error" formaction="?/delete">DELETE</button>
                    <button class="btn bg-base-100 text-base-content">Cancel</button>
                    </div>
                </form>
                </dialog>
			</div>
			<h2 class="card-title text-primary font-bold text-3xl max-md:text-2xl max-sm:text-xl capitalize">
				<!-- Make this titlecase -->
                {data.image?.name}
			</h2>
			<small class="text-sm italic">Uploaded {getTimeAgo(new Date(data.image?.created_at))}</small>
            {#if data.image?.description}
			    <p class="text-base">{data.image?.description}</p>
            {/if}
			<div class="divider before:bg-neutral-focus after:bg-neutral-focus" />
			<h3 class="text-secondary font-medium">Embed links</h3>
			<div class="form-control w-full">
				<label for="sharelink" class="label w-fit">
					<span class="label-text text-neutral-content">Share Link</span>
				</label>
                <div class="join">
					<input
						type="text"
						id="sharelink"
						name="sharelink"
						value={$page.url.origin + "/img/" + data.image?.url}
						class="w-full input text-base-content join-item"
                        on:click={highlight}
						readonly
					/>
                    <button
                        class="btn join-item"
                        on:click={() => copyToClipboard('sharelink')}    
                    >Copy</button>
                </div>
			</div>
			<div class="form-control w-full">
				<label for="directlink" class="label w-fit">
					<span class="label-text text-neutral-content">Direct Link</span>
				</label>
				<div class="join">
					<input
						type="text"
						id="directlink"
						name="directlink"
						value={data.image?.storage_url}
						class="w-full input text-base-content join-item"
                        on:click={highlight}
						readonly
					/>
                    <button
                        class="btn join-item"
                        on:click={() => copyToClipboard('directlink')}    
                    >Copy</button>
                </div>
			</div>
                <div class="form-control w-full">
				<label for="markdownlink" class="label w-fit">
					<span class="label-text text-neutral-content">Markdown Link</span>
				</label>
				<div class="join">
					<input
						type="text"
						id="markdownlink"
						name="markdownlink"
						value={`[${data.image?.name}](${data.image?.storage_url})`}
						class="w-full input text-base-content join-item"
                        on:click={highlight}
						readonly
					/>
                    <button
                        class="btn join-item"
                        on:click={() => copyToClipboard('markdownlink')}    
                    >Copy</button>
                </div>
			</div>
		</div>
	</div>
    {#if linkCopied > 0}
    <div class="toast">
        {#each Array.from({ length: linkCopied }) as _, i (i)}
            <div class="alert alert-info">
                <span>Link copied</span>
            </div>
        {/each}
    </div>
    {/if}
</div>
