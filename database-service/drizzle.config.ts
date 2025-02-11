import { defineConfig } from 'drizzle-kit'
import 'dotenv/config'
// via connection params
export default defineConfig({
  dialect: "mysql",
  out: "./src/drizzzle",
  schema:  "./src/schema",
  dbCredentials: {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "12345",
    database: "threadhive",
  },
  verbose: true

})
