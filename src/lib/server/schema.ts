import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

import { post, user } from './db/schema';

export const PostInput = createInsertSchema(post);
export const PostOutput = createSelectSchema(post);

export const User = createSelectSchema(user);
