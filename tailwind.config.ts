import containerQueries from '@tailwindcss/container-queries';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';

export default {
	darkMode: 'selector',
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			screens: {
				'3xl': '1920px' // This defines the 3xl breakpoint at 1920px (you can adjust as needed)
			},
			aspectRatio: {
				'3/2': '3 / 2'
			}
		}
	},

	plugins: [typography, forms, containerQueries]
} satisfies Config;
