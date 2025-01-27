import { defineConfig } from '@playwright/test';

export default defineConfig({
	webServer: {
		command: 'bun --bun run build && bun --bun run preview',
		port: 4173
	},

	testDir: 'e2e'
});
