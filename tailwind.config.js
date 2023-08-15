/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			borderWidth: {
				5: '5px'
			}
		}
	},
	daisyui: {
		themes: ['retro', 'night']
	},
	plugins: [require('daisyui')]
};