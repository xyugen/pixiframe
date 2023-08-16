/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				poppins: ['Poppins', 'sans-serif'],
				popo: ['Popo Font', 'sans-serif'],
			},
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