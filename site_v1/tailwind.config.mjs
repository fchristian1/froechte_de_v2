/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
	],
	theme: {
		extend: {},
	},
	plugins: [
		function ({ addComponents, theme }) {
			addComponents({
				'.btn': {
					padding: '.5rem 1rem',
					borderRadius: '.25rem',
					fontSize: '1rem',
					fontWeight: '600',
					backgroundColor: theme('colors.blue.500'),
					color: theme('colors.white'),
					'&:hover': {
						backgroundColor: theme('colors.blue.600'),
					}
				}
			});
		}
	],
}
