"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uniqueLikeConstraint = exports.likes = void 0;
const mysql_core_1 = require("drizzle-orm/mysql-core");
const likeTypeEnum_1 = require("../enums/likeTypeEnum");
const channelSchema_1 = require("./channelSchema");
const postSchema_1 = require("./postSchema");
const userSchema_1 = require("./userSchema");
exports.likes = (0, mysql_core_1.mysqlTable)('likes', {
    id: (0, mysql_core_1.bigint)('id', { mode: 'bigint' }).primaryKey().autoincrement(),
    type: (0, mysql_core_1.mysqlEnum)('type', Object.values(likeTypeEnum_1.LIKETYPE)).notNull(),
    typeId: (0, mysql_core_1.bigint)('type_id', { mode: 'bigint' }).notNull(),
    likedBy: (0, mysql_core_1.bigint)('liked_by', { mode: 'bigint' })
        .references(() => {
        return userSchema_1.users.id;
    }, { onDelete: 'cascade' })
        .notNull(),
    count: (0, mysql_core_1.int)('count').notNull(),
    postId: (0, mysql_core_1.bigint)('post_id', { mode: 'bigint' })
        .references(() => {
        return postSchema_1.posts.id;
    }, { onDelete: 'cascade' })
        .notNull(),
    channelId: (0, mysql_core_1.bigint)('channel_id', { mode: 'bigint' })
        .references(() => {
        return channelSchema_1.channels.id;
    }, { onDelete: 'cascade' })
        .notNull(),
    createdAt: (0, mysql_core_1.timestamp)('created_at').defaultNow().notNull(),
});
exports.uniqueLikeConstraint = (0, mysql_core_1.uniqueIndex)('unique_like').on(exports.likes.postId, exports.likes.type, exports.likes.typeId, exports.likes.likedBy, exports.likes.channelId);
//# sourceMappingURL=likeSchema.js.map