import { fail, redirect } from '@sveltejs/kit';
import { LuciaError } from 'lucia';
import { z } from 'zod';

import { auth } from '$lib/server/lucia';

import type { Actions } from './$types';

const Input = z.object({
	username: z.string().min(4).max(39),
	password: z.string().min(8).max(255),
});

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const formData = await request.formData();
		const username = formData.get('username');
		const password = formData.get('password');

		const result = Input.safeParse({
			username,
			password,
		});

		if (!result.success) {
			return fail(400, {
				message: result.error.issues[0].message,
			});
		}

		try {
			const key = await auth.useKey(
				'username',
				result.data.username.toLowerCase(),
				result.data.password,
			);

			const session = await auth.createSession({
				userId: key.userId,
				attributes: {},
			});

			locals.auth.setSession(session);
		} catch (e) {
			if (
				e instanceof LuciaError &&
				(e.message === 'AUTH_INVALID_KEY_ID' ||
					e.message === 'AUTH_INVALID_PASSWORD')
			) {
				return fail(400, {
					message: 'Incorrect username or password',
				});
			}

			return fail(500, {
				message: 'An unknown error occurred',
			});
		}

		return redirect(302, '/');
	},
};
