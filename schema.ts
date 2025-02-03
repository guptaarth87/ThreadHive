import { bigint, mysqlTable, varchar, timestamp, boolean, json } from 'drizzle-orm/mysql-core';
import { relations } from 'drizzle-orm';

export const channel = mysqlTable('channel', {
  id: bigint('id', { mode: 'number' }).autoincrement().primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  created_at: timestamp('created_at').notNull(),
  modified_at: timestamp('modified_at'),
  deleted_at: timestamp('deleted_at'),
  is_deleted: boolean('is_deleted').notNull(),
});

export const users = mysqlTable('users', {
  id: bigint('id', { mode: 'number' }).autoincrement().primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  email: varchar('email', { length: 100 }).notNull(),
  password: varchar('password', { length: 500 }).notNull(),
  role: varchar('role', { length: 10 }).notNull(),
  created_at: timestamp('created_at').notNull(),
  dob: timestamp('dob').notNull(),
  modified_at: timestamp('modified_at'),
  deleted_at: timestamp('deleted_at'),
  is_deleted: boolean('is_deleted').notNull(),
});

export const usersChannelMapping = mysqlTable('users_channel_mapping', {
  id: bigint('id', { mode: 'number' }).autoincrement().primaryKey(),
  user_id: bigint('user_id', { mode: 'number' }).references(() => users.id, { onDelete: 'cascade' }).notNull(),
  channel_id: bigint('channel_id', { mode: 'number' }).references(() => channel.id, { onDelete: 'cascade' }).notNull(),
});

export const posts = mysqlTable('posts', {
  id: bigint('id', { mode: 'number' }).autoincrement().primaryKey(),
  title: varchar('title', { length: 100 }).notNull(),
  description: varchar('description', { length: 800 }).notNull(),
  created_at: timestamp('created_at').notNull(),
  modified_at: timestamp('modified_at'),
  deleted_at: timestamp('deleted_at'),
  is_deleted: boolean('is_deleted').notNull(),
  created_by: bigint('created_by', { mode: 'number' }).references(() => users.id, { onDelete: 'cascade' }).notNull(),
  modified_by: bigint('modified_by', { mode: 'number' }).references(() => users.id, { onDelete: 'cascade' }).notNull(),
  channel_id: bigint('channel_id', { mode: 'number' }).references(() => channel.id, { onDelete: 'cascade' }).notNull(),
});

export const comments = mysqlTable('comments', {
  id: bigint('id', { mode: 'number' }).autoincrement().primaryKey(),
  description: varchar('description', { length: 800 }).notNull(),
  created_at: timestamp('created_at').notNull(),
  modified_at: timestamp('modified_at'),
  deleted_at: timestamp('deleted_at'),
  is_deleted: boolean('is_deleted').notNull(),
  created_by: bigint('created_by', { mode: 'number' }).references(() => users.id, { onDelete: 'cascade' }).notNull(),
  modified_by: bigint('modified_by', { mode: 'number' }).references(() => users.id, { onDelete: 'cascade' }).notNull(),
  post_id: bigint('post_id', { mode: 'number' }).references(() => posts.id, { onDelete: 'cascade' }).notNull(),
  channel_id: bigint('channel_id', { mode: 'number' }).references(() => channel.id, { onDelete: 'cascade' }).notNull(),
});

export const replies = mysqlTable('replies', {
  id: bigint('id', { mode: 'number' }).autoincrement().primaryKey(),
  description: varchar('description', { length: 800 }).notNull(),
  created_at: timestamp('created_at').notNull(),
  modified_at: timestamp('modified_at'),
  deleted_at: timestamp('deleted_at'),
  is_deleted: boolean('is_deleted').notNull(),
  created_by: bigint('created_by', { mode: 'number' }).references(() => users.id, { onDelete: 'cascade' }).notNull(),
  modified_by: bigint('modified_by', { mode: 'number' }).references(() => users.id, { onDelete: 'cascade' }).notNull(),
  post_id: bigint('post_id', { mode: 'number' }).references(() => posts.id, { onDelete: 'cascade' }).notNull(),
  comment_id: bigint('comment_id', { mode: 'number' }).references(() => comments.id, { onDelete: 'cascade' }).notNull(),
  channel_id: bigint('channel_id', { mode: 'number' }).references(() => channel.id, { onDelete: 'cascade' }).notNull(),
});

export const likes = mysqlTable('likes', {
  id: bigint('id', { mode: 'number' }).autoincrement().primaryKey(),
  type: varchar('type', { length: 10 }).notNull(),
  type_id: bigint('type_id', { mode: 'number' }).notNull(),
  liked_by: bigint('liked_by', { mode: 'number' }).references(() => users.id, { onDelete: 'cascade' }).notNull(),
  count: bigint('count', { mode: 'number' }).notNull(),
  post_id: bigint('post_id', { mode: 'number' }).references(() => posts.id, { onDelete: 'cascade' }).notNull(),
  channel_id: bigint('channel_id', { mode: 'number' }).references(() => channel.id, { onDelete: 'cascade' }).notNull(),
});

export const activities = mysqlTable('activities', {
  id: bigint('id', { mode: 'number' }).autoincrement().primaryKey(),
  activity: varchar('activity', { length: 500 }).notNull(),
  created_at: timestamp('created_at').notNull(),
  action_by: bigint('action_by', { mode: 'number' }).references(() => users.id, { onDelete: 'cascade' }).notNull(),
  additional_data: json('additional_data'),
  channel_id: bigint('channel_id', { mode: 'number' }).references(() => channel.id, { onDelete: 'cascade' }).notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
  posts: many(posts),
  comments: many(comments),
  replies: many(replies),
  activities: many(activities),
  channels: many(usersChannelMapping),
}));

export const postsRelations = relations(posts, ({ many, one }) => ({
  user: one(users, { fields: [posts.created_by], references: [users.id] }),
  comments: many(comments),
  likes: many(likes),
}));

export const commentsRelations = relations(comments, ({ one, many }) => ({
  user: one(users, { fields: [comments.created_by], references: [users.id] }),
  post: one(posts, { fields: [comments.post_id], references: [posts.id] }),
  replies: many(replies),
}));
