import { defineConfig } from 'vitest/config';
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig({
	plugins: [sveltekit()],

	define: {
		'process.env': process.env
	},

	server: {
		host: '0.0.0.0', // Allow connections from Docker
		port: 5173, // Ensure it matches your setup
		strictPort: true, // Prevent port conflicts
		watch: {
			usePolling: true // Enable polling for file changes in Docker
		},
		hmr: {
			clientPort: 5173, // Ensure HMR uses the correct exposed port
			host: 'localhost' // Required for Docker to properly proxy HMR
		}
	},

	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
