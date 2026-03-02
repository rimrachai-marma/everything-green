import express from "express";

import authRoutes from "./auth";
import userRoutes from "./user";

const router = express.Router();

// ─── Auth ─────────────────────────────────────────────────────────────────────
router.use("/auth", authRoutes);

// ─── User ─────────────────────────────────────────────────────────────────────
router.use("/user", userRoutes);

export default router;
