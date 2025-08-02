import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo , db} from "./routes/demo";
import { getSites } from "./routes/siteSchedules";
import { getSchedule } from "./routes/siteSchedules";

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


  return app;
}
