import express from 'express';
import type {Server} from 'http';
import request from 'supertest';
import {createServer} from 'vite';

async function createTemplateServer() {
	const app = express();
	const vite = await createServer({
		server: {middlewareMode: true},
		appType: 'custom',
		base: '/',
	});
	app.use(vite.middlewares);
	app.use('*', async (request, response) => {
		const name = request.originalUrl.replace('/', '');
		response
			.status(200)
			.set({'Content-Type': 'text/html'})
			.end(`<div>${name}</div>`);
	});
	return app;
}

let cachedServer: Server;
export async function renderServerTemplate(name: string) {
	const server = cachedServer ?? (await createTemplateServer());
	cachedServer = server;
	const requestBuilder = request(server).get(`/${name}`);
	const response = await requestBuilder.send();
	return response.text;
}
