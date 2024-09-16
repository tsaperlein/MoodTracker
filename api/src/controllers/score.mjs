// CONTROLLERS - Score

import dotenv from "dotenv";
dotenv.config();

import {
  calculateSurveyVersionScore,
  fetchLatestSurveyScores,
  fetchAllSurveyScores,
} from "../services/score.mjs";

// Controller to get the latest 10 fully completed surveys and their scores
export async function getLatestSurveysAndScores(req, res) {
  const { user_id } = req.params;

  try {
    const results = await fetchLatestSurveyScores(user_id);
    return res.json({ success: true, results });
  } catch (error) {
    console.error("Error in getLatestSurveyScores:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

// Controller to get all surveys and their scores
export async function getAllSurveysAndScores(req, res) {
  const { user_id } = req.params;

  try {
    const results = await fetchAllSurveyScores(user_id);
    return res.json({ success: true, results });
  } catch (error) {
    console.error("Error in getAllSurveysAndScores:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

// Controller to get the score of a specific survey version
export async function getSurveyVersionScore(req, res) {
  const { survey_id } = req.params;

  try {
    const versionScore = await calculateSurveyVersionScore(survey_id);
    return res.json({ success: true, versionScore });
  } catch (error) {
    console.error("Error retrieving the survey version score:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
