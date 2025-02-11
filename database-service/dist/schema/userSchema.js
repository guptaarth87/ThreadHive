"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRelations = exports.users = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const mysql_core_1 = require("drizzle-orm/mysql-core");
const activitySchema_1 = require("./activitySchema");
const commentSchema_1 = require("./commentSchema");
const postSchema_1 = require("./postSchema");
const replySchema_1 = require("./replySchema");
const userChannelMappingSchema_1 = require("./userChannelMappingSchema");
exports.users = (0, mysql_core_1.mysqlTable)('users', {
    id: (0, mysql_core_1.bigint)('id', { mode: 'bigint' }).primaryKey().autoincrement(),
    name: (0, mysql_core_1.varchar)('name', { length: 100 }).notNull(),
    email: (0, mysql_core_1.varchar)('email', { length: 100 }).notNull(),
    password: (0, mysql_core_1.varchar)('password', { length: 500 }).notNull(),
    role: (0, mysql_core_1.mysqlEnum)(['ADMIN', 'SUPERADMIN', 'USER']).notNull(),
    createdAt: (0, mysql_core_1.timestamp)('created_at').notNull(),
    dob: (0, mysql_core_1.date)('dob').notNull(),
    modifiedAt: (0, mysql_core_1.timestamp)('modified_at'),
    deletedAt: (0, mysql_core_1.timestamp)('deleted_at'),
    isDeleted: (0, mysql_core_1.boolean)('is_deleted').notNull(),
});
exports.usersRelations = (0, drizzle_orm_1.relations)(exports.users, ({ many }) => {
    return {
        posts: many(postSchema_1.posts),
        comments: many(commentSchema_1.comments),
        replies: many(replySchema_1.replies),
        activities: many(activitySchema_1.activities),
        channels: many(userChannelMappingSchema_1.usersChannelMapping),
    };
});
//# sourceMappingURL=userSchema.js.map