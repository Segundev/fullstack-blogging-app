/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./src/**/*.{html,js,svelte,ts}' // Keep this to apply Tailwind to your project files
	],
	darkMode: 'media', // Revert dark mode to the default (media-query-based)
	theme: {
		extend: {
			colors: {
				primary: {
					DEFAULT: '#F08F11',
					50: '#FBE0BE',
					100: '#FAD7AB',
					200: '#F7C584',
					300: '#F5B35E',
					400: '#F2A137',
					500: '#F08F11',
					600: '#BD700C',
					700: '#885109',
					800: '#533105',
					900: '#1F1202',
					950: '#040300'
				}
			},
			fontFamily: {
				kalam: ['Kalam', 'sans-serif'],
				sourceCodePro: ['Source Code Pro', 'monospace'],
				sourceSans3: ['Source Sans 3', 'sans-serif']
			}
		} // Remove custom extensions to revert to default
	},
	plugins: [] // Remove all plugins to revert to default
};
