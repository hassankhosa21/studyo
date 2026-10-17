import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import docToPdfRoute from "./routes/docToPdf";

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://studyo-ut5n.vercel.app"
  ]
}));
app.use(express.json({ limit: "50mb" }));

// Routes
app.use("/api", docToPdfRoute);

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
    endpoints: ["/api/health", "/api/doc-to-pdf"],
  });
});

// Vercel Serverless ke liye export zaroori hai
export default app;