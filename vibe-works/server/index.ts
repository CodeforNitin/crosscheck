import "dotenv/config";
import express from "express";
import { Request, Response } from "express";
import cors from "cors";
import { handleDemo , db} from "./routes/demo";
import { getSites } from "./routes/siteSchedules";
import { getSchedule } from "./routes/siteSchedules";
import { Pool } from "node_modules/mysql2/typings/mysql/lib/Pool";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import "dotenv/config";
import { Import } from "lucide-react";
import { pool } from "./db/mysql";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

 

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);
  app.get("/api/db", db);

  // site dropdown schedule Data fetch route
  app.get("/api/sites", getSites);
  
  // Project Schedule Data fetch route
  app.get("/api/schedules", getSchedule);

  // Register Endpoint
app.post('/api/register', async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const [empRows]: any = await pool.query('SELECT * FROM emprecords WHERE EmailD = ?', [email]);
    if (empRows.length === 0) return res.status(404).json({ message: 'Email not in company records' });

    const [existingRows]: any = await pool.query('SELECT * FROM employee_register WHERE email = ?', [email]);
    if (existingRows.length > 0) return res.status(409).json({ message: 'User already registered' });

    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query('INSERT INTO employee_register (email, password) VALUES (?, ?)', [email, hashedPassword]);
    return res.status(201).json({ message: 'Registration successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login Endpoint
app.post('/api/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const [rows]: any = await pool.query('SELECT * FROM employee_register WHERE email = ?', [email]);
    if (rows.length === 0) return res.status(404).json({ message: 'User not registered' });

    const isMatch = await bcrypt.compare(password, rows[0].password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ email }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
    return res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

  app.get("/api/me", async (req: Request, res: Response) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }});



return app;
}
