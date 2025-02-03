"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.users = void 0;
const mysql_core_1 = require("drizzle-orm/mysql-core");
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
//# sourceMappingURL=userSchema.js.map