<script lang="ts">
    import { onMount } from "svelte";
    import { themeChange } from 'theme-change';

    const handleCheckboxChange = (event: Event) => {  
        event.preventDefault();

        const isChecked = (event.target as HTMLInputElement).checked;
        localStorage.setItem('toggler-active', isChecked.toString());
    }

    onMount(() => {
        themeChange(false);
        const themeToggler = document.querySelector('.theme-toggler') as HTMLInputElement;
        themeToggler.checked = localStorage.getItem('toggler-active') === 'true';
    });
</script>

<div class="w-fit gap-2 flex items-center">
    <input type="checkbox" class="theme-toggler toggle" data-toggle-theme="retro,night" data-act-class="theme-active" on:change={handleCheckboxChange} />
</div>