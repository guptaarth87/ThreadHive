import { bigint, mysqlTable, varchar, timestamp, boolean, json, date, mysqlEnum } from 'drizzle-orm/mysql-core';

import { users } from './userSchema';


export const activities = mysqlTable('activities', {
  id: bigint('id', { mode: 'bigint' }).primaryKey().autoincrement(),
  activity: varchar('activity', { length: 500 }).notNull(),
  createdAt: timestamp('created_at').notNull(),
  actionBy: bigint('action_by', { mode: 'bigint' }).references(() => users.id).notNull(),
  additional_data: json('additional_data'),
  });

