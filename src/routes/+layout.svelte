<script lang="ts">
    import '../app.css';
    import ThemeChanger from '$lib/components/themeChanger.svelte';
</script>

<div class="py-4 px-28 max-sm:py-2 max-sm:px-5 max-sm:text-sm h-screen flex flex-col">
    <nav class="flex items-center justify-between">
        <h1 class="text-lg font-bold">PixFrame</h1>
        <div class="flex">
            <ThemeChanger />
        </div>
    </nav>
    <main class="flex-grow p-8 max-sm:p-0">
        <slot />
    </main>
</div>