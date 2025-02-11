import {
  bigint,
  json,
  mysqlTable,
  timestamp,
  varchar,
} from 'drizzle-orm/mysql-core';

import { users } from './userSchema';

export const activities = mysqlTable('activities', {
  id: bigint('id', { mode: 'bigint' }).primaryKey().autoincrement(),
  activity: varchar('activity', { length: 500 }).notNull(),
  createdAt: timestamp('created_at').notNull(),
  actionBy: bigint('action_by', { mode: 'bigint' })
    .references(() => {
      return users.id;
    })
    .notNull(),
  additionalData: json('additional_data'),
});
