// ROUTES - Survey

import express from "express";
import {
  createDailySurvey,
  getLatestSurveyAndVersion,
} from "../controllers/survey.mjs";

const router = express.Router();

// Survey routes
router.post("/users/:user_id/create-daily-survey", createDailySurvey);
router.get("/users/:user_id/latest-survey-version", getLatestSurveyAndVersion);

export default router;
