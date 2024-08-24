// ROUTES - Answer

import express from "express";
import {
  getSurveyAnswers,
  updateDailySurveyAnswers,
  getLatestSurveysAndScores,
} from "../controllers/answer.mjs";

const router = express.Router();

// Define the route to get survey answers for a specific version
router.get(
  "/users/:user_id/survey/:survey_id/:version/get-answers",
  getSurveyAnswers
);
router.post(
  "/users/:user_id/daily-survey/update-answers",
  updateDailySurveyAnswers
);
router.get(
  "/users/:user_id/get-latest-surveys-and-scores",
  getLatestSurveysAndScores
);

export default router;
