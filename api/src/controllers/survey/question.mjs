// CONTROLLER - Question

import dotenv from "dotenv";
dotenv.config();

import { getXataClient } from "../../xata.mjs";
const client = getXataClient();

async function getSurveyQuestions(req, res) {
  try {
    const { user_id, survey_id } = req.params;

    // Fetch the survey
    const survey = await client.db.Survey.filter({
      user_id,
      id: survey_id,
    }).getFirst();

    if (!survey || !survey.id) {
      return res
        .status(404)
        .json({ message: `Survey ID ${survey_id} not found for user.` });
    }

    // Fetch the answers related to the specific survey
    const answers = await client.db.Answer.filter({
      survey_id: survey.id,
    }).getAll();

    if (!answers || answers.length === 0) {
      return res.status(404).json({
        message: `No questions found for survey ${survey_id}.`,
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
    console.error("Error fetching survey questions:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}

export { getSurveyQuestions };
