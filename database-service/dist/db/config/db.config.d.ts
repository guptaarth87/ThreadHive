import 'dotenv/config';
import * as mysql from 'mysql2/promise';
import * as schema from '../../schema/index';
export declare const db: import("drizzle-orm/mysql2").MySql2Database<typeof schema> & {
    $client: mysql.Pool;
};
