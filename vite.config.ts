import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vitest/config'
import fs from 'fs'

export default defineConfig({
	plugins: [sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},
	server: {
		https: {
			key: fs.readFileSync('./ssl-certificates/192.168.29.10-key.pem'),
			cert: fs.readFileSync('./ssl-certificates/192.168.29.10.pem')
		},
		host: '0.0.0.0',
		port: 4173,
		fs: {
			allow: [
				'./static',  // Allow static directory
				'./src/lib',
				'./src/routes',
				'./src',
			]
		}
	}
})
