// SERVICES - Question

import dotenv from "dotenv";
dotenv.config();

import { getXataClient } from "../xata.mjs";
const client = getXataClient();

import { findSurvey } from "./survey.mjs";
import { getAnswersBySurveyId } from "./answer.mjs";

// Service function to fetch survey questions by survey ID and user ID
export async function fetchSurveyQuestions(user_id, survey_id) {
  try {
    // Use the findSurvey function to fetch the survey
    const {
      success: surveySuccess,
      survey,
      error: surveyError,
    } = await findSurvey(user_id, survey_id);

    // Handle survey not found or error
    if (!surveySuccess) {
      return {
        error: surveyError || `Survey ID ${survey_id} not found for user.`,
        status: 404,
      };
    }

    // Use the getAnswersBySurveyId function to fetch the answers for the survey
    const {
      success: answersSuccess,
      answers,
      error: answersError,
    } = await getAnswersBySurveyId(survey_id);

    // Handle no answers found or error
    if (!answersSuccess) {
      return {
        error: answersError || `No questions found for survey ${survey_id}.`,
        status: 404,
      };
    }

    // Fetch the corresponding question text for each answer
    const questions = await Promise.all(
      answers.map(async (answer) => {
        const question = await client.db.Question.read(answer.question_id.id);
        return {
          id: answer.question_id.id,
          text: question?.text || "Text not found",
        };
      })
    );

    return { success: true, questions };
  } catch (error) {
    console.error("Error fetching survey questions:", error.message);
    return { error: "Internal server error", status: 500 };
  }
}
