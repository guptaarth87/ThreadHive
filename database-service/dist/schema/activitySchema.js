"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRelations = exports.activities = void 0;
const mysql_core_1 = require("drizzle-orm/mysql-core");
const drizzle_orm_1 = require("drizzle-orm");
const userSchema_1 = require("./userSchema");
const channelSchema_1 = require("./channelSchema");
const postSchema_1 = require("./postSchema");
const commentSchema_1 = require("./commentSchema");
const replySchema_1 = require("./replySchema");
const userChannelMappingSchema_1 = require("./userChannelMappingSchema");
exports.activities = (0, mysql_core_1.mysqlTable)('activities', {
    id: (0, mysql_core_1.bigint)('id', { mode: 'bigint' }).primaryKey().autoincrement(),
    activity: (0, mysql_core_1.varchar)('activity', { length: 500 }).notNull(),
    createdAt: (0, mysql_core_1.timestamp)('created_at').notNull(),
    actionBy: (0, mysql_core_1.bigint)('action_by', { mode: 'bigint' }).references(() => userSchema_1.users.id).notNull(),
    additional_data: (0, mysql_core_1.json)('additional_data'),
    channelId: (0, mysql_core_1.bigint)('channel_id', { mode: 'bigint' }).references(() => channelSchema_1.channels.id, { onDelete: 'cascade' }).notNull(),
});
exports.usersRelations = (0, drizzle_orm_1.relations)(userSchema_1.users, ({ many }) => ({
    posts: many(postSchema_1.posts),
    comments: many(commentSchema_1.comments),
    replies: many(replySchema_1.replies),
    activities: many(exports.activities),
    channels: many(userChannelMappingSchema_1.usersChannelMapping),
}));
//# sourceMappingURL=activitySchema.js.map