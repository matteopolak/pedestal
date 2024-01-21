import { json } from '@sveltejs/kit';
import { generateOpenApiDocument } from 'trpc-openapi';

import { PUBLIC_BASE_URL } from '$env/static/public';
import { app } from '$lib/server/routes';

import type { RequestHandler } from './$types';

const openApiDocument = generateOpenApiDocument(app, {
	title: 'My SvelteKit API',
	version: '1.0.0',
	baseUrl: PUBLIC_BASE_URL,
});

export const GET: RequestHandler = () => {
	return json(openApiDocument);
};
