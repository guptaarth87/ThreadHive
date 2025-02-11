import {
  bigint,
  boolean,
  mysqlTable,
  timestamp,
  varchar,
} from 'drizzle-orm/mysql-core';

export const channels = mysqlTable('channels', {
  id: bigint('id', { mode: 'bigint' }).primaryKey().autoincrement(),
  name: varchar('name', { length: 100 }).notNull(),
  createdAt: timestamp('created_at').notNull(),
  modifiedAt: timestamp('modified_at'),
  deletedAt: timestamp('deleted_at'),
  isDeleted: boolean('is_deleted').notNull(),
});
