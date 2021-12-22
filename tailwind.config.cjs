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
		function ({ addUtilities }) {
			addUtilities({
				'.borders': {
					'@apply border-2 border-gray-200': {}
				},
				'.surface': {
					'@apply borders p-2 rounded': {}
				},
				'.btn': {
					'@apply surface bg-white hover:bg-gray-100': {}
				}
			});
		}
	]
};
