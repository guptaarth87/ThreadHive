import { bigint, mysqlTable, varchar, timestamp, boolean, json, date, mysqlEnum } from 'drizzle-orm/mysql-core';
import { relations } from 'drizzle-orm';
import { users } from './userSchema';
import { channels } from './channelSchema';

export const usersChannelMapping = mysqlTable('users_channel_mapping', {
  id: bigint('id', { mode: 'bigint' }).primaryKey().autoincrement(),
  userId: bigint('user_id', { mode: 'bigint' }).references(() => users.id, { onDelete: 'cascade' }).notNull(),
  channelId: bigint('channel_id', { mode: 'bigint' }).references(() => channels.id, { onDelete: 'cascade' }).notNull(),
  modifiedAt: timestamp('modified_at')
});
