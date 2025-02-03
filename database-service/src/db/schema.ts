import { bigint, mysqlTable, varchar, timestamp, boolean, json, date, mysqlEnum } from 'drizzle-orm/mysql-core';
import { relations } from 'drizzle-orm';

export const channels = mysqlTable('channels', {
  id: bigint('id', { mode: 'bigint' }).primaryKey().autoincrement(),
  name: varchar('name', { length: 100 }).notNull(),
  createdAt: timestamp('created_at').notNull(),
  modified_at: timestamp('modified_at'),
  deleted_at: timestamp('deleted_at'),
  isDeleted: boolean('is_deleted').notNull(),
});

export const users = mysqlTable('users', {
  id: bigint('id', { mode: 'bigint' }).primaryKey().autoincrement(),
  name: varchar('name', { length: 100 }).notNull(),
  email: varchar('email', { length: 100 }).notNull(),
  password: varchar('password', { length: 500 }).notNull(),
  role: mysqlEnum(['ADMIN','USER','SUPERADMIN']).notNull(),
  createdAt: timestamp('created_at').notNull(),
  dob: date('dob').notNull(),
  modified_at: timestamp('modified_at'),
  deleted_at: timestamp('deleted_at'),
  isDeleted: boolean('is_deleted').notNull(),
});

export const usersChannelMapping = mysqlTable('users_channel_mapping', {
  id: bigint('id', { mode: 'bigint' }).primaryKey().autoincrement(),
  userId: bigint('user_id', { mode: 'bigint' }).references(() => users.id, { onDelete: 'cascade' }).notNull(),
  channelId: bigint('channel_id', { mode: 'bigint' }).references(() => channels.id, { onDelete: 'cascade' }).notNull(),
});

export const posts = mysqlTable('posts', {
  id: bigint('id', { mode: 'bigint' }).primaryKey().autoincrement(),
  title: varchar('title', { length: 100 }).notNull(),
  description: varchar('description', { length: 800 }).notNull(),
  createdAt: timestamp('created_at').notNull(),
  modifiedAt: timestamp('modified_at'),
  deletedAt: timestamp('deleted_at'),
  isDeleted: boolean('is_deleted').notNull(),
  createdBy: bigint('created_by', { mode: 'bigint' }).references(() => users.id, { onDelete: 'cascade' }).notNull(),
  modifiedBy: bigint('modified_by', { mode: 'bigint' }).references(() => users.id, { onDelete: 'cascade' }).notNull(),
  channelId: bigint('channel_id', { mode: 'bigint' }).references(() => channels.id, { onDelete: 'cascade' }).notNull(),
});

export const comments = mysqlTable('comments', {
  id: bigint('id', { mode: 'bigint' }).primaryKey().autoincrement(),
  description: varchar('description', { length: 800 }).notNull(),
  createdAt: timestamp('created_at').notNull(),
  modifiedAt: timestamp('modified_at'),
  deletedAt: timestamp('deleted_at'),
  isDeleted: boolean('is_deleted').notNull(),
  createdBy: bigint('created_by', { mode: 'bigint' }).references(() => users.id, { onDelete: 'cascade' }).notNull(),
  modifiedBy: bigint('modified_by', { mode: 'bigint' }).references(() => users.id, { onDelete: 'cascade' }).notNull(),
  postId: bigint('post_id', { mode: 'bigint' }).references(() => posts.id, { onDelete: 'cascade' }).notNull(),
  channelId: bigint('channel_id', { mode: 'bigint' }).references(() => channels.id, { onDelete: 'cascade' }).notNull(),
});

export const replies = mysqlTable('replies', {
  id: bigint('id', { mode: 'bigint' }).primaryKey().autoincrement(),
  description: varchar('description', { length: 800 }).notNull(),
  createdAt: timestamp('created_at').notNull(),
  modifiedAt: timestamp('modified_at'),
  deletedAt: timestamp('deleted_at'),
  isDeleted: boolean('is_deleted').notNull(),
  createdBy: bigint('created_by', { mode: 'bigint' }).references(() => users.id, { onDelete: 'cascade' }).notNull(),
  modifiedBy: bigint('modified_by', { mode: 'bigint' }).references(() => users.id, { onDelete: 'cascade' }).notNull(),
  postId: bigint('post_id', { mode: 'bigint' }).references(() => posts.id, { onDelete: 'cascade' }).notNull(),
  commentId: bigint('comment_id', { mode: 'bigint' }).references(() => comments.id, { onDelete: 'cascade' }).notNull(),
  channelId: bigint('channel_id', { mode: 'bigint' }).references(() => channels.id, { onDelete: 'cascade' }).notNull(),
});

export const likes = mysqlTable('likes', {
  id: bigint('id', { mode: 'bigint' }).primaryKey().autoincrement(),
  type: mysqlEnum(['post','comment','reply']).notNull(),
  typeId: bigint('type_id', { mode: 'bigint' }).notNull(),
  likedBy: bigint('liked_by', { mode: 'bigint' }).references(() => users.id, { onDelete: 'cascade' }).notNull(),
  count: bigint('count', { mode: 'bigint' }).notNull(),
  postId: bigint('post_id', { mode: 'bigint' }).references(() => posts.id, { onDelete: 'cascade' }).notNull(),
  channelId: bigint('channel_id', { mode: 'bigint' }).references(() => channels.id, { onDelete: 'cascade' }).notNull(),
});

export const activities = mysqlTable('activities', {
  id: bigint('id', { mode: 'bigint' }).primaryKey().autoincrement(),
  activity: varchar('activity', { length: 500 }).notNull(),
  createdAt: timestamp('created_at').notNull(),
  actionBy: bigint('action_by', { mode: 'bigint' }).references(() => users.id).notNull(),
  additional_data: json('additional_data'),
  channelId: bigint('channel_id', { mode: 'bigint' }).references(() => channels.id, { onDelete: 'cascade' }).notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
  posts: many(posts),
  comments: many(comments),
  replies: many(replies),
  activities: many(activities),
  channels: many(usersChannelMapping),
}));

export const postsRelations = relations(posts, ({ many, one }) => ({
  user: one(users, { fields: [posts.createdBy], references: [users.id] }),
  comments: many(comments),
  likes: many(likes),
}));

export const commentsRelations = relations(comments, ({ one, many }) => ({
  user: one(users, { fields: [comments.createdBy], references: [users.id] }),
  post: one(posts, { fields: [comments.postId], references: [posts.id] }),
  replies: many(replies),
}));
