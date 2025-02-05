import { bigint, mysqlTable, varchar, timestamp, boolean, json, date, mysqlEnum } from 'drizzle-orm/mysql-core';
import { relations } from 'drizzle-orm';
import { posts } from './postSchema';
import { comments } from './commentSchema';
import { replies } from './replySchema';
import { usersChannelMapping } from './userChannelMappingSchema';
import { activities } from './activitySchema';

export const users = mysqlTable('users', {
    id: bigint('id', { mode: 'bigint' }).primaryKey().autoincrement(),
    name: varchar('name', { length: 100 }).notNull(),
    email: varchar('email', { length: 100 }).notNull(),
    password: varchar('password', { length: 500 }).notNull(),
    role: mysqlEnum(['ADMIN','USER','SUPERADMIN']).notNull(),
    createdAt: timestamp('created_at').notNull(),
    dob: date('dob').notNull(),
    modified_at: timestamp('modified_at'),
    deleted_at: timestamp('deleted_at'),
    isDeleted: boolean('is_deleted').notNull(),
  });

  export const usersRelations = relations(users, ({ many }) => ({
    posts: many(posts),
    comments: many(comments),
    replies: many(replies),
    activities: many(activities),
    channels: many(usersChannelMapping),
  }));