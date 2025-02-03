"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.channels = void 0;
const mysql_core_1 = require("drizzle-orm/mysql-core");
exports.channels = (0, mysql_core_1.mysqlTable)('channels', {
    id: (0, mysql_core_1.bigint)('id', { mode: 'bigint' }).primaryKey().autoincrement(),
    name: (0, mysql_core_1.varchar)('name', { length: 100 }).notNull(),
    createdAt: (0, mysql_core_1.timestamp)('created_at').notNull(),
    modified_at: (0, mysql_core_1.timestamp)('modified_at'),
    deleted_at: (0, mysql_core_1.timestamp)('deleted_at'),
    isDeleted: (0, mysql_core_1.boolean)('is_deleted').notNull(),
});
//# sourceMappingURL=channelSchema.js.map