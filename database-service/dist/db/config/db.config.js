"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
require("dotenv/config");
const mysql2_1 = require("drizzle-orm/mysql2");
const mysql = require("mysql2/promise");
const schema = require("../../schema/index");
require("dotenv/config");
const poolConnection = mysql.createPool({
    host: process.env.HOST,
    user: 'root',
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: 3306,
});
exports.db = (0, mysql2_1.drizzle)(poolConnection, { schema, mode: "default" });
//# sourceMappingURL=db.config.js.map