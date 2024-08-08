// CONTROLLER - Question

import dotenv from "dotenv";
dotenv.config();

import { getXataClient } from "../xata.mjs";
import { findLatestSurvey } from "../controllers/survey.mjs"; // Adjust the import path as needed

const client = getXataClient();

async function getDailySurveyQuestions(req, res) {
  try {
    const { user_id } = req.params;

    // Get the latest survey ID and version for the user
    const { surveyId } = await findLatestSurvey(user_id);

    if (!surveyId) {
      return res
        .status(404)
        .json({ message: "No surveys found for this user." });
    }

    // Fetch the latest survey version directly by sorting versions in descending order
    const latestSurvey = await client.db.Survey.filter({
      user_id,
      survey_id: surveyId,
    })
      .sort("version", "desc")
      .getFirst();

    if (!latestSurvey || !latestSurvey.id) {
      return res
        .status(404)
        .json({ message: `Survey ID ${surveyId} not found for user.` });
    }

    // Fetch the answers related to the specific survey
    const answers = await client.db.Answer.filter({
      survey_id: latestSurvey.id,
    }).getAll();

    if (!answers || answers.length === 0) {
      return res.status(404).json({
        message: `No questions found for survey version ${latestSurvey.version}.`,
      });
    }

    // Iterate over each answer and fetch the corresponding question text
    const questions = await Promise.all(
      answers.map(async (answer) => {
        const question = await client.db.Question.read(answer.question_id.id);
        return {
          id: answer.question_id.id,
          text: question?.text || "Text not found",
        };
      })
    );

    // Return the questions as JSON response
    return res.status(200).json({
      questions,
    });
  } catch (error) {
    console.error(
      "Error fetching survey questions for the latest version:",
      error
    );
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}

export { getDailySurveyQuestions };
