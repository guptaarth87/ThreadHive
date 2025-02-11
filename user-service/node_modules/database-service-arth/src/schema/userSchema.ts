import { relations } from 'drizzle-orm';
import {
  bigint,
  boolean,
  date,
  mysqlEnum,
  mysqlTable,
  timestamp,
  varchar,
} from 'drizzle-orm/mysql-core';
import { ROLES } from '../enums/roleEnum';
import { activities } from './activitySchema';
import { comments } from './commentSchema';
import { posts } from './postSchema';
import { replies } from './replySchema';
import { usersChannelMapping } from './userChannelMappingSchema';

export const users = mysqlTable('users', {
  id: bigint('id', { mode: 'bigint' }).primaryKey().autoincrement(),
  name: varchar('name', { length: 100 }).notNull(),
  email: varchar('email', { length: 100 }).notNull(),
  password: varchar('password', { length: 500 }).notNull(),
  role: mysqlEnum('role', Object.values(ROLES) as [string]).notNull(),
  createdAt: timestamp('created_at').notNull(),
  dob: date('dob').notNull(),
  modifiedAt: timestamp('modified_at'),
  deletedAt: timestamp('deleted_at'),
  isDeleted: boolean('is_deleted').notNull(),
});

export const usersRelations = relations(users, ({ many }) => {
  return {
    posts: many(posts),
    comments: many(comments),
    replies: many(replies),
    activities: many(activities),
    channels: many(usersChannelMapping),
  };
});
