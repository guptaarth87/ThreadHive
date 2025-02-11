import { relations } from 'drizzle-orm';
import {
  bigint,
  boolean,
  mysqlTable,
  timestamp,
  varchar,
} from 'drizzle-orm/mysql-core';
import { channels } from './channelSchema';
import { posts } from './postSchema';
import { replies } from './replySchema';
import { users } from './userSchema';

export const comments = mysqlTable('comments', {
  id: bigint('id', { mode: 'bigint' }).primaryKey().autoincrement(),
  description: varchar('description', { length: 800 }).notNull(),
  createdAt: timestamp('created_at').notNull(),
  modifiedAt: timestamp('modified_at'),
  deletedAt: timestamp('deleted_at'),
  isDeleted: boolean('is_deleted').notNull(),
  createdBy: bigint('created_by', { mode: 'bigint' })
    .references(
      () => {
        return users.id;
      },
      { onDelete: 'cascade' }
    )
    .notNull(),
  modifiedBy: bigint('modified_by', { mode: 'bigint' })
    .references(
      () => {
        return users.id;
      },
      { onDelete: 'cascade' }
    )
    .notNull(),
  postId: bigint('post_id', { mode: 'bigint' })
    .references(
      () => {
        return posts.id;
      },
      { onDelete: 'cascade' }
    )
    .notNull(),
  channelId: bigint('channel_id', { mode: 'bigint' })
    .references(
      () => {
        return channels.id;
      },
      { onDelete: 'cascade' }
    )
    .notNull(),
});

export const commentsRelations = relations(comments, ({ one, many }) => {
  return {
    user: one(users, { fields: [comments.createdBy], references: [users.id] }),
    post: one(posts, { fields: [comments.postId], references: [posts.id] }),
    replies: many(replies),
  };
});
