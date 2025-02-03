import { bigint, mysqlTable, varchar, timestamp, boolean, json, date, mysqlEnum } from 'drizzle-orm/mysql-core';
import { relations } from 'drizzle-orm';
import { users } from './userSchema';
import { channels } from './channelSchema';
import { posts } from './postSchema';
import { comments } from './commentSchema';
import { replies } from './replySchema';
import { usersChannelMapping } from './userChannelMappingSchema';

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
