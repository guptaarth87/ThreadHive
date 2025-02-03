import { bigint, mysqlTable, varchar, timestamp, boolean, json, date, mysqlEnum } from 'drizzle-orm/mysql-core';
import { relations } from 'drizzle-orm';

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