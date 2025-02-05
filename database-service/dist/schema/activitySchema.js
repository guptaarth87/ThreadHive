"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activities = void 0;
const mysql_core_1 = require("drizzle-orm/mysql-core");
const userSchema_1 = require("./userSchema");
exports.activities = (0, mysql_core_1.mysqlTable)('activities', {
    id: (0, mysql_core_1.bigint)('id', { mode: 'bigint' }).primaryKey().autoincrement(),
    activity: (0, mysql_core_1.varchar)('activity', { length: 500 }).notNull(),
    createdAt: (0, mysql_core_1.timestamp)('created_at').notNull(),
    actionBy: (0, mysql_core_1.bigint)('action_by', { mode: 'bigint' }).references(() => userSchema_1.users.id).notNull(),
    additional_data: (0, mysql_core_1.json)('additional_data'),
});
//# sourceMappingURL=activitySchema.js.map