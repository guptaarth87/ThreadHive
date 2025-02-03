"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsRelations = exports.posts = void 0;
const mysql_core_1 = require("drizzle-orm/mysql-core");
const drizzle_orm_1 = require("drizzle-orm");
const userSchema_1 = require("./userSchema");
const channelSchema_1 = require("./channelSchema");
const commentSchema_1 = require("./commentSchema");
const likeSchema_1 = require("./likeSchema");
exports.posts = (0, mysql_core_1.mysqlTable)('posts', {
    id: (0, mysql_core_1.bigint)('id', { mode: 'bigint' }).primaryKey().autoincrement(),
    title: (0, mysql_core_1.varchar)('title', { length: 100 }).notNull(),
    description: (0, mysql_core_1.varchar)('description', { length: 800 }).notNull(),
    createdAt: (0, mysql_core_1.timestamp)('created_at').notNull(),
    modifiedAt: (0, mysql_core_1.timestamp)('modified_at'),
    deletedAt: (0, mysql_core_1.timestamp)('deleted_at'),
    isDeleted: (0, mysql_core_1.boolean)('is_deleted').notNull(),
    createdBy: (0, mysql_core_1.bigint)('created_by', { mode: 'bigint' }).references(() => userSchema_1.users.id, { onDelete: 'cascade' }).notNull(),
    modifiedBy: (0, mysql_core_1.bigint)('modified_by', { mode: 'bigint' }).references(() => userSchema_1.users.id, { onDelete: 'cascade' }).notNull(),
    channelId: (0, mysql_core_1.bigint)('channel_id', { mode: 'bigint' }).references(() => channelSchema_1.channels.id, { onDelete: 'cascade' }).notNull(),
});
exports.postsRelations = (0, drizzle_orm_1.relations)(exports.posts, ({ many, one }) => ({
    user: one(userSchema_1.users, { fields: [exports.posts.createdBy], references: [userSchema_1.users.id] }),
    comments: many(commentSchema_1.comments),
    likes: many(likeSchema_1.likes),
}));
//# sourceMappingURL=postSchema.js.map