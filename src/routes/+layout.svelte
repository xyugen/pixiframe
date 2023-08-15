<script lang="ts">
    import ThemeChanger from '$lib/components/themeChanger.svelte';
import '../app.css';
</script>

<div class="py-4 px-28 h-screen w-screen">
    <nav class="w-full flex flex-row justify-between">
        <h1 class=" text-lg font-bold select-none">PixFrame</h1>
        <div class="flex flex-row">
            <ThemeChanger />
        </div>
    </nav>
    <slot />
</div>