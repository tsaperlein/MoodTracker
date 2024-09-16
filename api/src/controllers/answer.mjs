// CONTROLLERS - Answer

import dotenv from "dotenv";
dotenv.config();

import {
  fetchSurveyAnswers,
  modifySurveyAnswers,
  checkSurveyCompletionStatus,
} from "../services/answer.mjs";

// GET SURVEY ANSWERS FOR A SPECIFIC USER AND SURVEY
export async function getSurveyAnswers(req, res) {
  const { user_id, survey_id } = req.params;

  try {
    // Call the service function to fetch survey answers
    const result = await fetchSurveyAnswers(user_id, survey_id);

    if (result.success) {
      return res.json(result);
    } else {
      return res.status(404).json({ error: result.error });
    }
  } catch (error) {
    console.error("Error fetching survey answers:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

// UPDATE SURVEY ANSWERS FOR A SPECIFIC USER AND SURVEY
export async function updateSurveyAnswers(req, res) {
  const { user_id } = req.params;
  const { survey_id, answers } = req.body;

  try {
    // Call the service function to update survey answers
    const result = await modifySurveyAnswers(user_id, survey_id, answers);

    if (result.success) {
      return res.json(result);
    } else {
      return res.status(404).json({ error: result.error });
    }
  } catch (error) {
    console.error("Error updating survey answers:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

// API function to check if a survey is finished and return the result
export async function checkIfSurveyVersionIsFinished(req, res) {
  const { survey_id } = req.params;

  try {
    // Call the service function to check if the survey is finished
    const result = await checkSurveyCompletionStatus(survey_id);

    if (result.success) {
      return res.json({ success: true, finished: result.finished });
    } else {
      return res.status(500).json({ success: false, error: result.error });
    }
  } catch (error) {
    console.error("Error checking if survey is finished:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
