"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersChannelMapping = void 0;
const mysql_core_1 = require("drizzle-orm/mysql-core");
const userSchema_1 = require("./userSchema");
const channelSchema_1 = require("./channelSchema");
exports.usersChannelMapping = (0, mysql_core_1.mysqlTable)('users_channel_mapping', {
    id: (0, mysql_core_1.bigint)('id', { mode: 'bigint' }).primaryKey().autoincrement(),
    userId: (0, mysql_core_1.bigint)('user_id', { mode: 'bigint' }).references(() => userSchema_1.users.id, { onDelete: 'cascade' }).notNull(),
    channelId: (0, mysql_core_1.bigint)('channel_id', { mode: 'bigint' }).references(() => channelSchema_1.channels.id, { onDelete: 'cascade' }).notNull(),
    modifiedAt: (0, mysql_core_1.timestamp)('modified_at')
});
//# sourceMappingURL=userChannelMappingSchema.js.map