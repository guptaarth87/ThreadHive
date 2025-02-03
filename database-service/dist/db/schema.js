"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentsRelations = exports.postsRelations = exports.usersRelations = exports.activities = exports.likes = exports.replies = exports.comments = exports.posts = exports.usersChannelMapping = exports.users = exports.channels = void 0;
const mysql_core_1 = require("drizzle-orm/mysql-core");
const drizzle_orm_1 = require("drizzle-orm");
exports.channels = (0, mysql_core_1.mysqlTable)('channels', {
    id: (0, mysql_core_1.bigint)('id', { mode: 'bigint' }).primaryKey().autoincrement(),
    name: (0, mysql_core_1.varchar)('name', { length: 100 }).notNull(),
    createdAt: (0, mysql_core_1.timestamp)('created_at').notNull(),
    modified_at: (0, mysql_core_1.timestamp)('modified_at'),
    deleted_at: (0, mysql_core_1.timestamp)('deleted_at'),
    isDeleted: (0, mysql_core_1.boolean)('is_deleted').notNull(),
});
exports.users = (0, mysql_core_1.mysqlTable)('users', {
    id: (0, mysql_core_1.bigint)('id', { mode: 'bigint' }).primaryKey().autoincrement(),
    name: (0, mysql_core_1.varchar)('name', { length: 100 }).notNull(),
    email: (0, mysql_core_1.varchar)('email', { length: 100 }).notNull(),
    password: (0, mysql_core_1.varchar)('password', { length: 500 }).notNull(),
    role: (0, mysql_core_1.mysqlEnum)(['ADMIN', 'USER', 'SUPERADMIN']).notNull(),
    createdAt: (0, mysql_core_1.timestamp)('created_at').notNull(),
    dob: (0, mysql_core_1.date)('dob').notNull(),
    modified_at: (0, mysql_core_1.timestamp)('modified_at'),
    deleted_at: (0, mysql_core_1.timestamp)('deleted_at'),
    isDeleted: (0, mysql_core_1.boolean)('is_deleted').notNull(),
});
exports.usersChannelMapping = (0, mysql_core_1.mysqlTable)('users_channel_mapping', {
    id: (0, mysql_core_1.bigint)('id', { mode: 'bigint' }).primaryKey().autoincrement(),
    userId: (0, mysql_core_1.bigint)('user_id', { mode: 'bigint' }).references(() => exports.users.id, { onDelete: 'cascade' }).notNull(),
    channelId: (0, mysql_core_1.bigint)('channel_id', { mode: 'bigint' }).references(() => exports.channels.id, { onDelete: 'cascade' }).notNull(),
});
exports.posts = (0, mysql_core_1.mysqlTable)('posts', {
    id: (0, mysql_core_1.bigint)('id', { mode: 'bigint' }).primaryKey().autoincrement(),
    title: (0, mysql_core_1.varchar)('title', { length: 100 }).notNull(),
    description: (0, mysql_core_1.varchar)('description', { length: 800 }).notNull(),
    createdAt: (0, mysql_core_1.timestamp)('created_at').notNull(),
    modifiedAt: (0, mysql_core_1.timestamp)('modified_at'),
    deletedAt: (0, mysql_core_1.timestamp)('deleted_at'),
    isDeleted: (0, mysql_core_1.boolean)('is_deleted').notNull(),
    createdBy: (0, mysql_core_1.bigint)('created_by', { mode: 'bigint' }).references(() => exports.users.id, { onDelete: 'cascade' }).notNull(),
    modifiedBy: (0, mysql_core_1.bigint)('modified_by', { mode: 'bigint' }).references(() => exports.users.id, { onDelete: 'cascade' }).notNull(),
    channelId: (0, mysql_core_1.bigint)('channel_id', { mode: 'bigint' }).references(() => exports.channels.id, { onDelete: 'cascade' }).notNull(),
});
exports.comments = (0, mysql_core_1.mysqlTable)('comments', {
    id: (0, mysql_core_1.bigint)('id', { mode: 'bigint' }).primaryKey().autoincrement(),
    description: (0, mysql_core_1.varchar)('description', { length: 800 }).notNull(),
    createdAt: (0, mysql_core_1.timestamp)('created_at').notNull(),
    modifiedAt: (0, mysql_core_1.timestamp)('modified_at'),
    deletedAt: (0, mysql_core_1.timestamp)('deleted_at'),
    isDeleted: (0, mysql_core_1.boolean)('is_deleted').notNull(),
    createdBy: (0, mysql_core_1.bigint)('created_by', { mode: 'bigint' }).references(() => exports.users.id, { onDelete: 'cascade' }).notNull(),
    modifiedBy: (0, mysql_core_1.bigint)('modified_by', { mode: 'bigint' }).references(() => exports.users.id, { onDelete: 'cascade' }).notNull(),
    postId: (0, mysql_core_1.bigint)('post_id', { mode: 'bigint' }).references(() => exports.posts.id, { onDelete: 'cascade' }).notNull(),
    channelId: (0, mysql_core_1.bigint)('channel_id', { mode: 'bigint' }).references(() => exports.channels.id, { onDelete: 'cascade' }).notNull(),
});
exports.replies = (0, mysql_core_1.mysqlTable)('replies', {
    id: (0, mysql_core_1.bigint)('id', { mode: 'bigint' }).primaryKey().autoincrement(),
    description: (0, mysql_core_1.varchar)('description', { length: 800 }).notNull(),
    createdAt: (0, mysql_core_1.timestamp)('created_at').notNull(),
    modifiedAt: (0, mysql_core_1.timestamp)('modified_at'),
    deletedAt: (0, mysql_core_1.timestamp)('deleted_at'),
    isDeleted: (0, mysql_core_1.boolean)('is_deleted').notNull(),
    createdBy: (0, mysql_core_1.bigint)('created_by', { mode: 'bigint' }).references(() => exports.users.id, { onDelete: 'cascade' }).notNull(),
    modifiedBy: (0, mysql_core_1.bigint)('modified_by', { mode: 'bigint' }).references(() => exports.users.id, { onDelete: 'cascade' }).notNull(),
    postId: (0, mysql_core_1.bigint)('post_id', { mode: 'bigint' }).references(() => exports.posts.id, { onDelete: 'cascade' }).notNull(),
    commentId: (0, mysql_core_1.bigint)('comment_id', { mode: 'bigint' }).references(() => exports.comments.id, { onDelete: 'cascade' }).notNull(),
    channelId: (0, mysql_core_1.bigint)('channel_id', { mode: 'bigint' }).references(() => exports.channels.id, { onDelete: 'cascade' }).notNull(),
});
exports.likes = (0, mysql_core_1.mysqlTable)('likes', {
    id: (0, mysql_core_1.bigint)('id', { mode: 'bigint' }).primaryKey().autoincrement(),
    type: (0, mysql_core_1.mysqlEnum)(['post', 'comment', 'reply']).notNull(),
    typeId: (0, mysql_core_1.bigint)('type_id', { mode: 'bigint' }).notNull(),
    likedBy: (0, mysql_core_1.bigint)('liked_by', { mode: 'bigint' }).references(() => exports.users.id, { onDelete: 'cascade' }).notNull(),
    count: (0, mysql_core_1.bigint)('count', { mode: 'bigint' }).notNull(),
    postId: (0, mysql_core_1.bigint)('post_id', { mode: 'bigint' }).references(() => exports.posts.id, { onDelete: 'cascade' }).notNull(),
    channelId: (0, mysql_core_1.bigint)('channel_id', { mode: 'bigint' }).references(() => exports.channels.id, { onDelete: 'cascade' }).notNull(),
});
exports.activities = (0, mysql_core_1.mysqlTable)('activities', {
    id: (0, mysql_core_1.bigint)('id', { mode: 'bigint' }).primaryKey().autoincrement(),
    activity: (0, mysql_core_1.varchar)('activity', { length: 500 }).notNull(),
    createdAt: (0, mysql_core_1.timestamp)('created_at').notNull(),
    actionBy: (0, mysql_core_1.bigint)('action_by', { mode: 'bigint' }).references(() => exports.users.id).notNull(),
    additional_data: (0, mysql_core_1.json)('additional_data'),
    channelId: (0, mysql_core_1.bigint)('channel_id', { mode: 'bigint' }).references(() => exports.channels.id, { onDelete: 'cascade' }).notNull(),
});
exports.usersRelations = (0, drizzle_orm_1.relations)(exports.users, ({ many }) => ({
    posts: many(exports.posts),
    comments: many(exports.comments),
    replies: many(exports.replies),
    activities: many(exports.activities),
    channels: many(exports.usersChannelMapping),
}));
exports.postsRelations = (0, drizzle_orm_1.relations)(exports.posts, ({ many, one }) => ({
    user: one(exports.users, { fields: [exports.posts.createdBy], references: [exports.users.id] }),
    comments: many(exports.comments),
    likes: many(exports.likes),
}));
exports.commentsRelations = (0, drizzle_orm_1.relations)(exports.comments, ({ one, many }) => ({
    user: one(exports.users, { fields: [exports.comments.createdBy], references: [exports.users.id] }),
    post: one(exports.posts, { fields: [exports.comments.postId], references: [exports.posts.id] }),
    replies: many(exports.replies),
}));
//# sourceMappingURL=schema.js.map