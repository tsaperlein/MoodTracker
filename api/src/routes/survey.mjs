// ROUTES - Survey

import express from "express";
import {
  createDailySurvey,
  getLatestSurvey,
  getSurvey,
  getPreviousSurveys,
} from "../controllers/survey.mjs";

const router = express.Router();

// Survey routes
router.post("/users/:user_id/create-daily-survey", createDailySurvey);
router.get("/users/:user_id/latest-survey", getLatestSurvey);
router.get("/users/:user_id/get-survey/:survey_id", getSurvey);
router.get("/users/:user_id/previous-surveys", getPreviousSurveys);

export default router;
