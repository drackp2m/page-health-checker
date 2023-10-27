import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import ssr from 'vike/plugin';

export default defineConfig({
	plugins: [preact(), ssr({ prerender: true })],
	root: 'src/app/',
	server: {
		port: 4200,
	}
});
