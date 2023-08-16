<script lang="ts">
	import type { PageData } from './$types';
	import { page } from '$app/stores';
	import { getTimeAgo } from '$lib/utils/helpers';
	import { comparePasswords } from '$lib/utils/passwordHashing';
	import { onMount } from 'svelte';

	const highlight = (event: Event) => {
		const input = event.target as HTMLInputElement;
		if (input) input.select();
	};

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
	};

	export let data: PageData;
	let passwordMatch = false;
	let password = data.password || "";
	// boolean variable that checks if password is equal to hashed password
	onMount (async () => {
		if (data.image?.password && data.password) {
			passwordMatch = await comparePasswords(data.password, data.image.password)
		}
	})

	const checkPassword = async () => {
		if (data.image?.password && password) {
			passwordMatch = await comparePasswords(password?.toString(), data.image.password)
		}
	}
</script>

<svelte:head>
	<title>PixiFrame | {data.image?.name}</title>
</svelte:head>

<div class="w-full h-full flex max-sm:py-14 justify-center items-center text-neutral-content">
	{#if passwordMatch || !data.image?.password}
		<div class="card h-fit w-11/12 bg-neutral shadow-xl break-all">
			<figure class="px-10 pt-10 max-md:pt-3 max-md:px-3">
				<img alt={data.image?.description} src={data.image?.storage_url} />
			</figure>
			<div class="card-body items-left text-left text-xl max-md:text-lg max-sm:text-sm">
				<div class="card-actions">
					<!-- FIXME: onclick -->
					<button
						class="btn btn-error text-error-content font-bold btn-sm"
						onclick="modal_delete.showModal()">Delete</button
					>
					<dialog id="modal_delete" class="modal modal-bottom sm:modal-middle">
						<form method="dialog" class="modal-box bg-warning text-warning-content">
							<h3 class="font-bold text-lg">Delete image?</h3>
							<p class="py-4">Are you sure you want to delete this image?</p>
							<div class="modal-action">
								<!-- if there is a button in form, it will close the modal -->
								<form method="post" action="?/delete">
									<button
										class="btn border-0 font-bold bg-error text-error-content hover:bg-error-content hover:text-error">DELETE</button
									>
								</form>
								<button class="btn bg-base-100 text-base-content">Cancel</button>
							</div>
						</form>
					</dialog>
				</div>
				<h2
					class="card-title text-primary font-bold text-3xl max-md:text-2xl max-sm:text-xl capitalize"
				>
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
							value={$page.url.origin + '/img/' + data.image?.url}
							class="w-full input text-base-content join-item"
							on:click={highlight}
							readonly
						/>
						<button class="btn join-item" on:click={() => copyToClipboard('sharelink')}>Copy</button>
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
						<button class="btn join-item" on:click={() => copyToClipboard('directlink')}>Copy</button>
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
						<button class="btn join-item" on:click={() => copyToClipboard('markdownlink')}
							>Copy</button
						>
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
	{:else}
	<div class="card h-5/6 w-11/12 bg-neutral shadow-xl break-all flex flex-col justify-center items-center space-y-9">
		<div class="bg-accent w-48 h-48 max-sm:w-40 max-sm:h-40 rounded-full flex items-center justify-center">
			<svg class="h-full w-8/12 fill-accent-content" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" width="48"><path d="M280-240q-100 0-170-70T40-480q0-100 70-170t170-70q78 0 131.5 37.5T491-583h429v206H814v137H628v-137H491q-26 62-79.5 99.5T280-240Zm0-60q71 0 116.5-47t53.5-90h242v137h62v-137h106v-86H450q-8-43-53.5-90T280-660q-75 0-127.5 52.5T100-480q0 75 52.5 127.5T280-300Zm0-112q29 0 48.5-19.5T348-480q0-29-19.5-48.5T280-548q-29 0-48.5 19.5T212-480q0 29 19.5 48.5T280-412Zm0-68Z"/></svg>
		</div>
		<h2 class="font-bold text-4xl max-sm:text-3xl text-primary">Protected Image</h2>
		<div class="w-10/12 flex flex-col">
			<label for="password" class="text-lg font-medium mb-1">Enter the password:</label>
			<div class="join">
				<input
					type="password"
					placeholder="Password"
					name="password"
					id="password"
					bind:value={password}
					class="flex-1 max-sm:w-7/12 input input-bordered bg-neutral-content text-neutral-focus join-item"
				/>
				<button class="btn join-item" on:click={checkPassword}>Unlock</button>
			</div>
		</div>
	</div>
	{/if}
</div>
