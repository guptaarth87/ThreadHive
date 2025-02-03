import { bigint, mysqlTable, varchar, timestamp, boolean, json, date, mysqlEnum } from 'drizzle-orm/mysql-core';
import { relations } from 'drizzle-orm';
import { users } from './userSchema';
import { posts } from './postSchema';
import { channels } from './channelSchema';
import { replies } from './replySchema';

export const comments = mysqlTable('comments', {
  id: bigint('id', { mode: 'bigint' }).primaryKey().autoincrement(),
  description: varchar('description', { length: 800 }).notNull(),
  createdAt: timestamp('created_at').notNull(),
  modifiedAt: timestamp('modified_at'),
  deletedAt: timestamp('deleted_at'),
  isDeleted: boolean('is_deleted').notNull(),
  createdBy: bigint('created_by', { mode: 'bigint' }).references(() => users .id, { onDelete: 'cascade' }).notNull(),
  modifiedBy: bigint('modified_by', { mode: 'bigint' }).references(() => users.id, { onDelete: 'cascade' }).notNull(),
  postId: bigint('post_id', { mode: 'bigint' }).references(() => posts.id, { onDelete: 'cascade' }).notNull(),
  channelId: bigint('channel_id', { mode: 'bigint' }).references(() => channels.id, { onDelete: 'cascade' }).notNull(),
});


export const commentsRelations = relations(comments, ({ one, many }) => ({
  user: one(users, { fields: [comments.createdBy], references: [users.id] }),
  post: one(posts, { fields: [comments.postId], references: [posts.id] }),
  replies: many(replies),
}));
