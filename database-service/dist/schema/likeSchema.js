"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.likes = void 0;
const mysql_core_1 = require("drizzle-orm/mysql-core");
const userSchema_1 = require("./userSchema");
const postSchema_1 = require("./postSchema");
const channelSchema_1 = require("./channelSchema");
exports.likes = (0, mysql_core_1.mysqlTable)('likes', {
    id: (0, mysql_core_1.bigint)('id', { mode: 'bigint' }).primaryKey().autoincrement(),
    type: (0, mysql_core_1.mysqlEnum)(['post', 'comment', 'reply']).notNull(),
    typeId: (0, mysql_core_1.bigint)('type_id', { mode: 'bigint' }).notNull(),
    likedBy: (0, mysql_core_1.bigint)('liked_by', { mode: 'bigint' }).references(() => userSchema_1.users.id, { onDelete: 'cascade' }).notNull(),
    count: (0, mysql_core_1.bigint)('count', { mode: 'bigint' }).notNull(),
    postId: (0, mysql_core_1.bigint)('post_id', { mode: 'bigint' }).references(() => postSchema_1.posts.id, { onDelete: 'cascade' }).notNull(),
    channelId: (0, mysql_core_1.bigint)('channel_id', { mode: 'bigint' }).references(() => channelSchema_1.channels.id, { onDelete: 'cascade' }).notNull(),
});
//# sourceMappingURL=likeSchema.js.map