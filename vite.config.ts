import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vitest/config'

export default defineConfig({
	plugins: [sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},
	server: {
		host: true,
		port: 4173,
		fs: {
			allow: [
				'E:/Litekart/seva/static',  // Allow static directory
				'E:/Litekart/seva/src/lib',
				'E:/Litekart/seva/src/routes',
				'E:/Litekart/seva/src',
			]
		}
	}
})
