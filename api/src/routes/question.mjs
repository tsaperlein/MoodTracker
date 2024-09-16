// ROUTES - Question

import express from "express";

const router = express.Router();

// Question Functions
import { getSurveyQuestions } from "../controllers/question.mjs";

// Question Routes
router.get(
  "/users/:user_id/survey/:survey_id/get-questions",
  getSurveyQuestions
);

export default router;
