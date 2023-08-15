/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				light: '',
				dark: '',
				retro: '',
				business: ''
			}
		}
	},
	daisyui: {
		themes: ['light', 'dark', 'retro', 'business']
	},
	plugins: [require('daisyui')]
};