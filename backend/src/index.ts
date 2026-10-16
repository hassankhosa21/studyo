import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: process.env.FRONTEND_URL || "http://localhost:3000" }));
app.use(express.json({ limit: "50mb" }));

// Health check route
app.get("/api/health", (_req: Request, res: Response) => {
  res.json({
    status: "ok",
    message: "Studyo backend is running",
    timestamp: new Date().toISOString(),
  });
});

// Root route
app.get("/", (_req: Request, res: Response) => {
  res.json({
    name: "Studyo Backend API",
    version: "1.0.0",
    endpoints: ["/api/health"],
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Studyo backend running on http://localhost:${PORT}`);
});