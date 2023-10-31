import { defineConfig } from 'vite';
import { VitePluginNode } from 'vite-plugin-node';

export default defineConfig({
	plugins: [
		...VitePluginNode({
			appName: 'api',
			adapter: 'fastify',
			appPath: './src/api/app.ts',
			exportName: 'fastify',
			tsCompiler: 'swc',
		}),
	],
	server: {
		host: '0.0.0.0',
		port: 3000,
		cors: true,
		https: {
			key: 'certs/key.pem',
			cert: 'certs/cert.pem',
		},
	},
});
