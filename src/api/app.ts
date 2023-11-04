import fs from 'node:fs';

import cors from '@fastify/cors';
import { config } from 'dotenv';
import Fastify from 'fastify';

import { GetStatusesUseCase } from './use-cases/get-statuses.use-case';

export const fastify = Fastify({
	http2: true,
	https: {
		key: fs.readFileSync('certs/key.pem'),
		cert: fs.readFileSync('certs/cert.pem'),
	},
});
fastify.register(cors, {
	origin: '*',
});

const conf = config();
const port = conf.parsed?.API_PORT;

fastify.get('/', (_request, reply) => {
	reply.send('QA Health Checker 2000');
});

fastify.get('/stats', async (_request, reply) => {
	const data = await new GetStatusesUseCase().execute();

	reply.header('Content-Type', 'application/json');

	return reply.serialize(data);
});

if (conf.parsed?.NODE_ENV === 'production') {
	fastify.listen({ port: 3000, host: '0.0.0.0' }, () => {
		console.log(`QA Health Checker 2000 runing on http://localhost:${port}`);
	});
}
