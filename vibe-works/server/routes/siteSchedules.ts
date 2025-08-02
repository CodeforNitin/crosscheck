// routes/sites.ts
import { RequestHandler } from "express";
import { pool } from "../db/mysql";

// get sites location drop down code

export const getSites: RequestHandler = async (_req, res) => {
  try {
    const [rows] = await pool.query("SELECT id, name FROM sites");
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch sites", details: error });
  }
};

// Project Schedule section fetch

export const getSchedule: RequestHandler = async (_req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        s.id,
        s.activity,
        s.sub_activity AS subActivity,
        s.location,
        s.duration,
        DATE_FORMAT(s.planned_start, '%Y-%m-%d') AS plannedStart,
        DATE_FORMAT(s.planned_end, '%Y-%m-%d') AS plannedEnd,
        DATE_FORMAT(s.actual_start, '%Y-%m-%d') AS actualStart,
        DATE_FORMAT(s.actual_end, '%Y-%m-%d') AS actualEnd,
        s.delay_days AS delayDays,
        s.predecessor,
        sup.name AS supervisor,
        pl.name AS planner
      FROM schedule s
      JOIN supervisors sup ON s.supervisor_id = sup.id
      JOIN planners pl ON s.planner_id = pl.id
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch schedule", details: err });
  }
};