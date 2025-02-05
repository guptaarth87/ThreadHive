import 'dotenv/config';
import { drizzle } from "drizzle-orm/mysql2";
import * as mysql  from "mysql2/promise";
import * as schema from '../../schema/index';
import 'dotenv/config'

const poolConnection = mysql.createPool({
  host: process.env.HOST,
  user: 'root', 
  database: process.env.DATABASE,
  password: process.env.PASSWORD, 
  port: 3306,  
});

export const db = drizzle(poolConnection, { schema,  mode: "default" });

