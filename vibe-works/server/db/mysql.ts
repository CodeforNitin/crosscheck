import mysql from "mysql2/promise";
import "dotenv/config";

export const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "constructiondb",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

pool.query("SELECT 1").then(() => {
  console.log("✅ MySQL connected");
}).catch((err) => {
  console.error("❌ MySQL connection failed:", err);
});