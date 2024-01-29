import { TRPCError } from '@trpc/server';
import { eq, sql } from 'drizzle-orm';

import { db } from '../db';
import { post } from '../db/schema';
import { PostInput, PostOutput, User } from '../schema';
import { procedure, protectedProcedure, router } from '../trpc';

async function getPost(id: string) {
	const data = await db.query.post.findFirst({
		where: eq(post.id, id),
		with: {
			author: true,
		},
	});

	if (!data) {
		throw new TRPCError({
			code: 'NOT_FOUND',
			message: 'post_not_found',
		});
	}

	return data;
}

export default router({
	create: protectedProcedure
		.input(PostInput.omit({ id: true, authorId: true }))
		.output(PostOutput)
		.mutation(async ({ input, ctx }) => {
			const posts = await db.insert(post)
				.values({
					...input,
					authorId: ctx.session.user.userId,
				})
				.returning({
					id: post.id,
				});

			return getPost(posts[0].id);
		}),
	get: procedure
		.input(PostInput.pick({ id: true }).required())
		.output(PostOutput.extend({
			author: User,
		}))
		.query(async ({ input }) => {
			return getPost(input.id);
		}),
	random: procedure
		.output(PostOutput.extend({
			author: User,
		}))
		.query(async () => {
			const data = await db.query.post.findFirst({
				with: {
					author: true,
				},
				orderBy: sql<number>`random()`,
			});

			if (!data) {
				throw new TRPCError({
					code: 'NOT_FOUND',
					message: 'post_not_found',
				});
			}

			return data;
		}),
});
