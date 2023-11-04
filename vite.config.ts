import preact from '@preact/preset-vite';
import ssr from 'vike/plugin';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [preact(), ssr({ prerender: true })],
	root: 'src/app',
	server: {
		host: '0.0.0.0',
		port: 4200,
		cors: true,
		https: {
			key: 'certs/key.pem',
			cert: 'certs/cert.pem',
		},
	},
});
