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