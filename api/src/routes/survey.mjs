// ROUTES - Survey

import express from "express";

const router = express.Router();

// Survey Functions
import {
  createDailySurvey,
  getSurvey,
  getLatestSurvey,
  getPreviousSurveys,
  isSurveyReadyForNextDay,
  getRemainingVersions,
} from "../controllers/survey.mjs";

// Survey Routes
router.post("/users/:user_id/create-daily-survey", createDailySurvey);
router.get("/users/:user_id/get-survey/:survey_id", getSurvey);
router.get("/users/:user_id/latest-survey", getLatestSurvey);
router.get("/users/:user_id/previous-surveys", getPreviousSurveys);
router.get("/users/:user_id/check-next-survey-status", isSurveyReadyForNextDay);
router.get("/users/:user_id/get-remaining-versions", getRemainingVersions);

export default router;
