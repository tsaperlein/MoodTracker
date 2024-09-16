// ROUTES - Mood Level

import express from "express";

const router = express.Router();

// Mood Level Functions
import { findUserMoodLevel } from "../controllers/moodLevel.mjs";

// Mood Level Routes
router.get("/users/:user_id/find-mood-level", findUserMoodLevel);

export default router;
