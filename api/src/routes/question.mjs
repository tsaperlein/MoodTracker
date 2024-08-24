// ROUTES - Question

import express from "express";
import {
  getDailySurveyQuestions,
  getSurveyQuestions,
} from "../controllers/question.mjs";

const router = express.Router();

// User routes
router.get(
  "/users/:user_id/daily-survey/get-questions",
  getDailySurveyQuestions
);
router.get(
  "/users/:user_id/survey/:survey_id/get-questions",
  getSurveyQuestions
);

export default router;
