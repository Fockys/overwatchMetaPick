import 'dotenv/config';
import mysql from "mysql2/promise";
import { drizzle } from "drizzle-orm/mysql2";


// Create connection using individual env vars
const connection = await mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE,
});

// Pass connection to drizzle
export const db = drizzle(connection);