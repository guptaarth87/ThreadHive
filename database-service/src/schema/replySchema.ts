import { bigint, mysqlTable, varchar, timestamp, boolean, json, date, mysqlEnum } from 'drizzle-orm/mysql-core';
import { relations } from 'drizzle-orm';
import { users } from './userSchema';
import { posts } from './postSchema';
import { comments } from './commentSchema';
import { channels } from './channelSchema';

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