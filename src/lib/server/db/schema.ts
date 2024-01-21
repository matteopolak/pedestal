import { bigint, pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core';

export const user = pgTable('user', {
	id: varchar('id', { length: 15 }).primaryKey(),
	name: text('name').notNull(),
	username: varchar('username', { length: 39 }).notNull().unique(),
	createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});

export const userKey = pgTable('user_key', {
	id: varchar('id', { length: 255 }).primaryKey(),
	userId: varchar('user_id', { length: 15 }).notNull().references(() => user.id),
	password: varchar('hashed_password', { length: 255 }),
});

export const userSession = pgTable('user_session', {
	id: varchar('id', { length: 128 }).primaryKey(),
	userId: varchar('user_id', { length: 15 }).notNull().references(() => user.id),
	activeExpires: bigint('active_expires', { mode: 'number' }).notNull(),
	idleExpires: bigint('idle_expires', { mode: 'number' }).notNull(),
});
