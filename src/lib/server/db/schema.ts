import { relations } from 'drizzle-orm';
import { bigint, pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

export const post = pgTable('post', {
	id: uuid('id').primaryKey().defaultRandom(),
	title: text('title').notNull(),
	description: text('description').notNull(),
	authorId: varchar('author_id', { length: 15 })
		.references(() => user.id, {
			onDelete: 'cascade',
			onUpdate: 'cascade',
		})
		.notNull(),
});

// Table definitions for Lucia Auth
export const user = pgTable('user', {
	id: varchar('id', { length: 15 }).primaryKey(),
	name: text('name').notNull(),
	username: varchar('username', { length: 39 }).unique().notNull(),
	createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

export const userKey = pgTable('user_key', {
	id: varchar('id', { length: 255 }).primaryKey(),
	userId: varchar('user_id', { length: 15 }).references(() => user.id).notNull(),
	password: varchar('hashed_password', { length: 255 }),
});

export const userSession = pgTable('user_session', {
	id: varchar('id', { length: 128 }).primaryKey(),
	userId: varchar('user_id', { length: 15 }).references(() => user.id).notNull(),
	activeExpires: bigint('active_expires', { mode: 'number' }).notNull(),
	idleExpires: bigint('idle_expires', { mode: 'number' }).notNull(),
});

export const postsRelations = relations(post, ({ one }) => ({
	author: one(user, {
		fields: [post.authorId],
		references: [user.id],
		relationName: 'author',
	}),
}));
