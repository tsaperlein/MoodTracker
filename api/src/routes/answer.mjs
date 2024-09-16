// ROUTES - Answer

import express from "express";

const router = express.Router();

// Answer Functions
import {
  checkIfSurveyVersionIsFinished,
  getSurveyAnswers,
  updateSurveyAnswers,
} from "../controllers/answer.mjs";

// Answer Routes
router.get("/users/:user_id/survey/:survey_id/get-answers", getSurveyAnswers);
router.post("/users/:user_id/daily-survey/update-answers", updateSurveyAnswers);
router.get("/surveys/:survey_id/check-status", checkIfSurveyVersionIsFinished);

export default router;
