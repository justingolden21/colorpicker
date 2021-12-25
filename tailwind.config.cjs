const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
	mode: 'jit',
	purge: {
		content: ['./src/**/*.{html,js,svelte,ts}']
	},
	theme: {
		screens: {
			xs: '360px',
			...defaultTheme.screens
		},
		extend: {}
	},
	variants: {
		extend: {}
	},
	plugins: []
};
