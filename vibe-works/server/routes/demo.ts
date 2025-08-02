import { RequestHandler } from "express";
import { DemoResponse } from "@shared/api";
import { pool } from "../db/mysql";


export const handleDemo: RequestHandler = (req, res) => {
  const response: DemoResponse = {
    message: "Hello from Express server",
  };
  res.status(200).json(response);
};


export const db: RequestHandler = async (req, res) => {
  console.log("🔁 Incoming request to /api/demo");
  try {
    const [rows] = await pool.query("SELECT * FROM sites LIMIT 1");
    res.status(200).json({
      message: "MySQL connected successfully!",
      sampleSite: rows,
    });
  } catch (error) {
    res.status(500).json({ message: "Database connection failed", error });
  }
};
