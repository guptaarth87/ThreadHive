import { bigint, mysqlTable, varchar, timestamp, boolean, json, date, mysqlEnum } from 'drizzle-orm/mysql-core';
import { relations } from 'drizzle-orm';
import { users } from './userSchema';
import { channels } from './channelSchema';
import { comments } from './commentSchema';
import { likes } from './likeSchema';

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


export const postsRelations = relations(posts, ({ many, one }) => ({
  user: one(users, { fields: [posts.createdBy], references: [users.id] }),
  comments: many(comments),
  likes: many(likes),
}));