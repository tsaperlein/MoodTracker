// ROUTES - Score

import express from "express";

const router = express.Router();

// Score Functions
import {
  getLatestSurveysAndScores,
  getAllSurveysAndScores,
  getSurveyVersionScore,
} from "../controllers/score.mjs";

// Score Routes
router.get(
  "/users/:user_id/get-latest-surveys-and-scores",
  getLatestSurveysAndScores
);
router.get(
  "/users/:user_id/get-all-surveys-and-scores",
  getAllSurveysAndScores
);
router.get("/survey/:survey_id/get-score", getSurveyVersionScore);

export default router;
