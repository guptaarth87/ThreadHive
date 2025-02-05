import { bigint, mysqlTable, varchar, timestamp, boolean, json, date, mysqlEnum, int, uniqueIndex } from 'drizzle-orm/mysql-core';
import { users } from './userSchema';
import { posts } from './postSchema';
import { channels } from './channelSchema';


export const likes = mysqlTable('likes', {
  id: bigint('id', { mode: 'bigint' }).primaryKey().autoincrement(),
  type: mysqlEnum(['POST','COMMENT','REPLY']).notNull(),
  typeId: bigint('type_id', { mode: 'bigint' }).notNull(),
  likedBy: bigint('liked_by', { mode: 'bigint' }).references(() => users.id, { onDelete: 'cascade' }).notNull(),
  count: int('count').notNull(),
  postId: bigint('post_id', { mode: 'bigint' }).references(() => posts.id, { onDelete: 'cascade' }).notNull(),
  channelId: bigint('channel_id', { mode: 'bigint' }).references(() => channels.id, { onDelete: 'cascade' }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  
},
(table) => ({
  uniqueLikeConstraint: uniqueIndex("unique_like")
    .on(table.postId, table.type, table.typeId, table.likedBy, table.channelId),
}));