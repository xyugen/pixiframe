<script lang="ts">
    import { onMount } from "svelte";
    import { themeChange } from 'theme-change';

    onMount(() => {
        themeChange(false)

        const radios: NodeListOf<HTMLInputElement> = document.querySelectorAll('.radio');
        radios.forEach(radio => {
            if (radio.classList.contains('theme-active')) {
                radio.checked = true;
            }
        });
    })
</script>

<div class="w-fit">
    <input type="radio" title="Light" name="radio-1" data-theme="light" data-set-theme="light" class="radio" data-act-class="theme-active" />
    <input type="radio" title="Dark" name="radio-1" data-theme="dark" data-set-theme="dark" class="radio" data-act-class="theme-active" />
    <input type="radio" title="Retro" name="radio-1" data-theme="retro" data-set-theme="retro" class="radio" data-act-class="theme-active" />
    <input type="radio" title="Business" name="radio-1" data-theme="business" data-set-theme="business" class="radio" data-act-class="theme-active" />
</div>