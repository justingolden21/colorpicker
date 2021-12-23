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
	plugins: [
		function ({ addComponents }) {
			addComponents({
				'.borders': {
					'@apply border-2 border-gray-200': {}
				},
				'.surface': {
					'@apply borders p-2 rounded bg-white': {}
				},
				'.btn': {
					'@apply surface hover:bg-gray-100': {}
				},
				'.btn-circle': {
					'@apply btn rounded-full': {}
				}
			});
		}
	]
};
