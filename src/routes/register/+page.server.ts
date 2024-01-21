import { fail, redirect } from '@sveltejs/kit';
import pg from 'pg';
import { z } from 'zod';

import { auth } from '$lib/server/lucia';

import type { Actions, PageServerLoad } from './$types';

const Input = z.object({
	username: z.string().min(4).max(39),
	password: z.string().min(8).max(255),
	name: z.string().min(1).max(255),
});

export const load = (async ({ locals }) => {
	const session = await locals.auth.validate();
	if (session) return redirect(302, '/');

	return {};
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request, locals }) => {
		const formData = await request.formData();
		const username = formData.get('username');
		const password = formData.get('password');
		const name = formData.get('name');

		const result = Input.safeParse({
			username,
			password,
			name,
		});

		if (!result.success) {
			return fail(400, {
				message: result.error.issues[0].message,
			});
		}

		try {
			const username = result.data.username.toLowerCase();
			const user = await auth.createUser({
				key: {
					providerId: 'username',
					providerUserId: username,
					password: result.data.password,
				},
				attributes: {
					username,
					name: result.data.name,
					thumbnail: null,
				},
			});

			const session = await auth.createSession({
				userId: user.userId,
				attributes: {},
			});

			locals.auth.setSession(session);
		} catch (e) {
			if (
				e instanceof pg.DatabaseError &&
				e.constraint
			) {
				return fail(400, {
					message: 'Username already taken.',
				});
			}

			return fail(500, {
				message: 'An unknown error occurred.',
			});
		}

		return redirect(302, '/');
	},
} satisfies Actions;
