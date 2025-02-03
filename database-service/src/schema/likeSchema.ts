import { bigint, mysqlTable, varchar, timestamp, boolean, json, date, mysqlEnum } from 'drizzle-orm/mysql-core';
import { relations } from 'drizzle-orm';
import { users } from './userSchema';
import { posts } from './postSchema';
import { channels } from './channelSchema';

export const likes = mysqlTable('likes', {
  id: bigint('id', { mode: 'bigint' }).primaryKey().autoincrement(),
  type: mysqlEnum(['post','comment','reply']).notNull(),
  typeId: bigint('type_id', { mode: 'bigint' }).notNull(),
  likedBy: bigint('liked_by', { mode: 'bigint' }).references(() => users.id, { onDelete: 'cascade' }).notNull(),
  count: bigint('count', { mode: 'bigint' }).notNull(),
  postId: bigint('post_id', { mode: 'bigint' }).references(() => posts.id, { onDelete: 'cascade' }).notNull(),
  channelId: bigint('channel_id', { mode: 'bigint' }).references(() => channels.id, { onDelete: 'cascade' }).notNull(),
});