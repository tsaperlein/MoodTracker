// SERVICES - Answer

import dotenv from "dotenv";
dotenv.config();

import { getXataClient } from "../xata.mjs";
const client = getXataClient();

// Utilities
import { adjustToGreeceTime } from "../utils/datetime.mjs";
import { findSurvey } from "./survey.mjs";

// Service function to fetch answers by survey ID
export async function getAnswersBySurveyId(survey_id) {
  try {
    const answers = await client.db.Answer.filter({ survey_id })
      .select(["type", "comment", "question_id.text"])
      .getAll();

    if (!answers.length) {
      return { success: false, error: "No answers found for this survey." };
    }

    return { success: true, answers };
  } catch (error) {
    console.error(`Error fetching answers for survey ${survey_id}:`, error);
    return {
      success: false,
      error: "Error fetching answers from the database.",
    };
  }
}

// Service function to fetch survey answers for a specific user and survey
export async function fetchSurveyAnswers(user_id, survey_id) {
  try {
    // Fetch the specific survey using survey_id and user_id from the database
    const surveyResult = await findSurvey(user_id, survey_id);
    if (!surveyResult.success) {
      return surveyResult;
    }

    // Fetch the answers related to this survey from the database
    const answerResult = await getAnswersBySurveyId(survey_id);
    if (!answerResult.success) {
      return answerResult;
    }

    // Format the answers
    const formattedAnswers = answerResult.answers.map((answer) => ({
      question: answer.question_id?.text || answer.question_id,
      type: answer.type,
      comment: answer.comment,
    }));

    return { success: true, answers: formattedAnswers };
  } catch (error) {
    console.error(
      `Error fetching survey answers for user ${user_id}, survey ${survey_id}:`,
      error
    );
    return { success: false, error: "Internal Server Error" };
  }
}

// Update survey answers for a specific user and survey
export async function modifySurveyAnswers(user_id, survey_id, answers) {
  try {
    // Fetch the specific survey using survey_id and user_id from the database
    const surveyResult = await findSurvey(user_id, survey_id);
    if (!surveyResult.success) {
      return surveyResult;
    }

    // Loop through the provided answers to update the Answer table
    for (const questionId in answers) {
      if (answers.hasOwnProperty(questionId)) {
        const { type, comment } = answers[questionId];

        // Find the specific answer entry in the database using survey_id and question_id
        const existingAnswer = await client.db.Answer.filter({
          survey_id,
          question_id: { id: questionId },
        }).getFirst();

        if (existingAnswer) {
          // Update the answer in the Answer table
          await client.db.Answer.update(existingAnswer.id, {
            type: type,
            comment: comment,
          });
        } else {
          console.error(
            `Answer not found for survey_id: ${survey.id} and question_id: ${questionId}`
          );
        }
      }
    }

    // Update the completion time in the Survey table
    await client.db.Survey.update(survey_id, {
      completion_time: adjustToGreeceTime(new Date()),
    });

    return { success: true };
  } catch (error) {
    console.error("Error updating survey answers:", error);
    throw new Error("Internal Server Error");
  }
}

// Check if a survey version is finished
export async function checkSurveyCompletionStatus(survey_id) {
  try {
    // Fetch the answers related to this survey from the database
    const answerResult = await getAnswersBySurveyId(survey_id);

    if (!answerResult.success) {
      return answerResult;
    }

    // Check if every answer has a non-null type (indicating the question is answered)
    const allAnswered = answerResult.answers.every(
      (answer) => answer.type !== null
    );

    return { success: true, finished: allAnswered };
  } catch (error) {
    console.error("Error checking if survey is finished:", error);
    return { success: false, error: "Internal Server Error" };
  }
}
