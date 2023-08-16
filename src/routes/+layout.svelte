<script lang="ts">
    import '../app.css';
    import ThemeChanger from '$lib/components/themeChanger.svelte';
	import PixiframeLogo from '$lib/assets/pixiframe_logo.webp'
	import { invalidate } from '$app/navigation'
	import { onMount } from 'svelte'

	export let data

	let { supabase, session } = data
	$: ({ supabase, session } = data)

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth')
			}
		})

		return () => data.subscription.unsubscribe()
	})
</script>

<svelte:head>
    <title>PixiFrame</title>
</svelte:head>

<div class="py-4 px-28 font-poppins max-sm:py-2 max-sm:px-5 max-sm:text-sm h-screen flex flex-col">
    <nav class="flex items-center justify-between">
        <h1 class="text-lg"><a class="flex flex-row items-center font-popo" href="/"><img class="w-12" src={PixiframeLogo} alt="logo"><span class="text-primary-focus">Pixi Frame</span></a></h1>
        <div class="flex">
            <ThemeChanger />
        </div>
    </nav>
    <main class="flex-grow p-8 max-sm:p-0">
        <slot />
    </main>
</div>