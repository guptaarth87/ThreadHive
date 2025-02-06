import {
  bigint,
  int,
  mysqlEnum,
  mysqlTable,
  timestamp,
  uniqueIndex,
} from 'drizzle-orm/mysql-core';
import { LIKETYPE } from '../enums/likeTypeEnum';
import { channels } from './channelSchema';
import { posts } from './postSchema';
import { users } from './userSchema';

export const likes = mysqlTable('likes', {
  id: bigint('id', { mode: 'bigint' }).primaryKey().autoincrement(),
  type: mysqlEnum('type', Object.values(LIKETYPE) as [string]).notNull(),
  typeId: bigint('type_id', { mode: 'bigint' }).notNull(),
  likedBy: bigint('liked_by', { mode: 'bigint' })
    .references(
      () => {
        return users.id;
      },
      { onDelete: 'cascade' }
    )
    .notNull(),
  count: int('count').notNull(),
  postId: bigint('post_id', { mode: 'bigint' })
    .references(
      () => {
        return posts.id;
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
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const uniqueLikeConstraint = uniqueIndex('unique_like').on(
  likes.postId,
  likes.type,
  likes.typeId,
  likes.likedBy,
  likes.channelId
);
