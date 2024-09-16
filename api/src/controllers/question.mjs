// CONTROLLER - Question

import dotenv from "dotenv";
dotenv.config();

import { fetchSurveyQuestions } from "../services/question.mjs";

// Controller to get survey questions by survey ID
export async function getSurveyQuestions(req, res) {
  const { user_id, survey_id } = req.params;

  try {
    // Call the service function to fetch the survey questions
    const { questions, error, status } = await fetchSurveyQuestions(
      user_id,
      survey_id
    );

    if (error) {
      return res.status(status).json({ message: error });
    }

    return res.status(200).json({ questions });
  } catch (error) {
    console.error("Error fetching survey questions:", error.message);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}
