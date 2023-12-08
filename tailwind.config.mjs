/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
	theme: {
		extend: {
			colors: {
				"primary": "#171D2C",
				"secondary": "#D4DCED",
				"accent": "#831D3A",
				"accent-content": "#FFF",
				"neutral": "#808080",
				"base-125": "#fff",
				"base-200": "#F7F7F7",
				"base-300": "#F1F1F1",
				"info": "#93c5fd",
				"success": "#22c55e",
				"warning": "#f59e0b",
				"error": "#ef4444",
			},
			fontFamily: {
				sans: ['Avenir', 'Helvetica', 'sans-serif'],
			},
			fontSize: {
				sm: '0.8rem',
				base: '1rem',
				xl: '1.25rem',
				'2xl': ['1.69rem', {
					lineHeight: '125%',
					letterSpacing: '-0.01em',
					fontWeight: '500',
				}],
				'3xl': ['2.25rem', {
					lineHeight: '125%',
					letterSpacing: '-0.02em',
					fontWeight: '500',
				}],
				'4xl': ['3.25rem', {
					lineHeight: '125%',
					letterSpacing: '-0.02em',
					fontWeight: '500',
				}],
				'5xl': ['5rem', {
					lineHeight: '100%',
					letterSpacing: '-0.03em',
					fontWeight: '500',
				}],
			},
		},
	},
	plugins: [require("daisyui")],
}
