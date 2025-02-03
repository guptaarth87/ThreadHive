"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.replies = void 0;
const mysql_core_1 = require("drizzle-orm/mysql-core");
const userSchema_1 = require("./userSchema");
const postSchema_1 = require("./postSchema");
const commentSchema_1 = require("./commentSchema");
const channelSchema_1 = require("./channelSchema");
exports.replies = (0, mysql_core_1.mysqlTable)('replies', {
    id: (0, mysql_core_1.bigint)('id', { mode: 'bigint' }).primaryKey().autoincrement(),
    description: (0, mysql_core_1.varchar)('description', { length: 800 }).notNull(),
    createdAt: (0, mysql_core_1.timestamp)('created_at').notNull(),
    modifiedAt: (0, mysql_core_1.timestamp)('modified_at'),
    deletedAt: (0, mysql_core_1.timestamp)('deleted_at'),
    isDeleted: (0, mysql_core_1.boolean)('is_deleted').notNull(),
    createdBy: (0, mysql_core_1.bigint)('created_by', { mode: 'bigint' }).references(() => userSchema_1.users.id, { onDelete: 'cascade' }).notNull(),
    modifiedBy: (0, mysql_core_1.bigint)('modified_by', { mode: 'bigint' }).references(() => userSchema_1.users.id, { onDelete: 'cascade' }).notNull(),
    postId: (0, mysql_core_1.bigint)('post_id', { mode: 'bigint' }).references(() => postSchema_1.posts.id, { onDelete: 'cascade' }).notNull(),
    commentId: (0, mysql_core_1.bigint)('comment_id', { mode: 'bigint' }).references(() => commentSchema_1.comments.id, { onDelete: 'cascade' }).notNull(),
    channelId: (0, mysql_core_1.bigint)('channel_id', { mode: 'bigint' }).references(() => channelSchema_1.channels.id, { onDelete: 'cascade' }).notNull(),
});
//# sourceMappingURL=replySchema.js.map