import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import routes from "./routes";
import { errorHandler, routeNotFound } from "./middleware/errorHandler";

export const app = express();

app.use(express.json());

// ─── CORS ─────────────────────────────────────────────────────────────────────
// const allowedOrigins = (process.env.ALLOWED_ORIGINS || "http://localhost:3000").split(",").map((o) => o.trim());

app.use(cors());

// ─── Body Parsers ────────────────────────────────────────────────────────────
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ─── Routes ───────────────────────────────────────────────────────────────────
app.use(routes);

// ─── Error Handling ──────────────────────────────────────────────────────────
app.use(routeNotFound);
app.use(errorHandler);
