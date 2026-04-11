import 'dotenv/config';
import mysql from "mysql2/promise";
import { drizzle, MySql2Database } from "drizzle-orm/mysql2";

let db: MySql2Database;

try{
  // Create connection using individual env vars
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
  });
  db = drizzle(connection)
}
catch{
  console.error("Could not connect to database")
}
// Pass connection to drizzle
export { db };