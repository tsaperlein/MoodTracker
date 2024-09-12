// ROUTES - Survey

import express from "express";

const router = express.Router();

/* --- SURVEY --- */
// Survey Functions
import {
  createDailySurvey,
  getSurvey,
  getLatestSurvey,
  getPreviousSurveys,
  isSurveyReadyForNextDay,
  getRemainingVersions,
} from "../controllers/survey/survey.mjs";

// Survey Routes
router.post("/users/:user_id/create-daily-survey", createDailySurvey);
router.get("/users/:user_id/get-survey/:survey_id", getSurvey);
router.get("/users/:user_id/latest-survey", getLatestSurvey);
router.get("/users/:user_id/previous-surveys", getPreviousSurveys);
router.get("/users/:user_id/check-next-survey-status", isSurveyReadyForNextDay);
router.get("/users/:user_id/get-remaining-versions", getRemainingVersions);

/* --- ANSWER --- */
// Answer Functions
import {
  checkIfSurveyVersionIsFinished,
  getSurveyAnswers,
  updateSurveyAnswers,
} from "../controllers/survey/answer.mjs";

// Answer Routes
router.get("/users/:user_id/survey/:survey_id/get-answers", getSurveyAnswers);
router.post("/users/:user_id/daily-survey/update-answers", updateSurveyAnswers);
router.get("/surveys/:survey_id/check-status", checkIfSurveyVersionIsFinished);

/* --- QUESTION --- */
// Question Functions
import { getSurveyQuestions } from "../controllers/survey/question.mjs";

// Question Routes
router.get(
  "/users/:user_id/survey/:survey_id/get-questions",
  getSurveyQuestions
);

/* --- SCORE --- */
// Score Functions
import {
  getLatestSurveysAndScores,
  getAllSurveysAndScores,
  getSurveyVersionScore,
} from "../controllers/survey/score.mjs";

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

/* --- PARTICIPATION --- */
// Participation Functions
import { getUserParticipation } from "../controllers/survey/participation.mjs";

// Participation Routes
router.get("/users/:user_id/get-participation", getUserParticipation);

export default router;
