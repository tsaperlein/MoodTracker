// ROUTES - Welcome Mood

import express from "express";
import {
  getWelcomeMoods,
  submitWelcomeMood,
  getLatestWelcomeMood,
  getLatestWeekWelcomeMoods,
} from "../controllers/welcomeMood.mjs";

const router = express.Router();

// Welcome mood routes
router.get("/users/:user_id/get-welcome-moods", getWelcomeMoods);
router.post("/users/:user_id/submit-welcome-mood", submitWelcomeMood);
router.get("/users/:user_id/get-latest-welcome-mood", getLatestWelcomeMood);
router.get(
  "/users/:user_id/get-latest-week-welcome-moods",
  getLatestWeekWelcomeMoods
);

export default router;
