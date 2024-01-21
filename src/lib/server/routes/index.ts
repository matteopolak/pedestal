import { z } from 'zod';

import { procedure, router } from '$lib/server/trpc';

export const app = router({
	hello: procedure
		.meta({
			openapi: {
				method: 'GET',
				path: '/hello',
				summary: 'Greets the user',
				description: 'Responds with a nice greeting message.',
				tags: ['welcome'],
			},
		})
		.input(z.void())
		.output(z.string())
		.query(() => {
			return 'Hello, world!';
		}),
});

export default app;
export type Router = typeof app;
