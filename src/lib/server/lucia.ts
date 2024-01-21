import { pg } from '@lucia-auth/adapter-postgresql';
import { lucia } from 'lucia';
import { sveltekit } from 'lucia/middleware';

import { dev } from '$app/environment';
import { pool } from '$lib/server/db';

export const auth = lucia({
	env: dev ? 'DEV' : 'PROD',
	middleware: sveltekit(),
	adapter: pg(pool, {
		user: 'user',
		key: 'user_key',
		session: 'user_session',
	}),
	getUserAttributes: (data) => {
		return {
			username: data.username,
			name: data.name,
			thumbnail: data.thumbnail,
		};
	},
});

export type Auth = typeof auth;
