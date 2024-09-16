// ROUTES - Streak Count

import express from "express";

const router = express.Router();

// Streak Count Functions
import { getStreakCount } from "../controllers/streakCount.mjs";

// Streak Count Routes
router.get("/users/:user_id/get-streak-count", getStreakCount);

export default router;
