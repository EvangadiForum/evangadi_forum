import dotenv from "dotenv";
dotenv.config();
import mysql from "mysql2/promise";
// import questionRoutes from "./src/routes/questionRoutes.js";

// export const db = mysql.createPool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   database: process.env.DB_NAME,
//   connectionLimit: 10,
// });

// console.log("DB_USER =", process.env.DB_USER);
// console.log("DB_PASS =", process.env.DB_PASS);
// console.log("DB_NAME =", process.env.DB_NAME);

// db.getConnection()
//   .then(() => {
//     console.log("Database connected successfully");
//   })
//   .catch((err) => {
//     console.error("Database connection failed:", err);
//     process.exit(1);
//   });

// import mysql from "mysql2/promise";
// import dotenv from "dotenv";

// dotenv.config();

// async function connectToDb() {
//   try {
//     const db = await mysql.createPool({
//       host: process.env.DB_HOST,
//       user: process.env.DB_USER,
//       password: process.env.DB_PASS,
//       database: process.env.DB_NAME,
//       connectionLimit: 10,
//     });
//     console.log("Database connection successful!");
//     return db;
//   } catch (error) {
//     console.error("Database connection failed:", error);
//     process.exit(1); // Exit process if database connection fails
//   }
// }

// import mysql from "mysql2/promise";
// import dotenv from "dotenv";

// dotenv.config();

async function connectToDb() {
  try {
    const pool = await mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      connectionLimit: 10,
    });
    console.log("Database connection successful!");
    return pool;
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
}

const db = await connectToDb();

export default db;
