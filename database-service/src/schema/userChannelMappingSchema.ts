import { bigint, mysqlTable, timestamp } from 'drizzle-orm/mysql-core';
import { channels } from './channelSchema';
import { users } from './userSchema';

export const usersChannelMapping = mysqlTable('users_channel_mapping', {
  id: bigint('id', { mode: 'bigint' }).primaryKey().autoincrement(),
  userId: bigint('user_id', { mode: 'bigint' })
    .references(
      () => {
        return users.id;
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
  modifiedAt: timestamp('modified_at'),
});
