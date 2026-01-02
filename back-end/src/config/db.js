import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

async function connectToDb() {
  try {
    const db = await mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      connectionLimit: 10,
    });
    console.log("Database connection successful!");
    return db;
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1); // Exit process if database connection fails
  }
}

const db = await connectToDb();
