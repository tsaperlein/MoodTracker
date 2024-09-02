// CONTROLLER - Answer

import dotenv from "dotenv";
dotenv.config();

import { getXataClient } from "../../xata.mjs";
const client = getXataClient();

import { adjustToGreeceTime } from "../../utils/datetime.mjs";

// GET SURVEY ANSWERS FOR A SPECIFIC USER AND SURVEY
async function getSurveyAnswers(req, res) {
  const { user_id, survey_id } = req.params;

  try {
    // Fetch the specific survey using survey_id and user_id from the database
    const survey = await client.db.Survey.filter({
      user_id: user_id,
      id: survey_id,
    }).getFirst();

    if (!survey) {
      return res.status(404).json({ error: "Survey not found" });
    }

    // Fetch the answers related to this survey from the database
    let answers = await client.db.Answer.filter({
      survey_id,
    })
      .select(["type", "comment", "question_id.text"])
      .getAll();

    // If no answers are found in the database, check the JSON file
    if (answers.length === 0) {
      return res
        .status(404)
        .json({ error: "No answers found for this survey." });
    }

    const formattedAnswers = answers.map((answer) => ({
      question: answer.question_id?.text || answer.question_id,
      type: answer.type,
      comment: answer.comment,
    }));

    return res.json({ success: true, answers: formattedAnswers });
  } catch (error) {
    console.error("Error fetching survey answers:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

// UPDATE SURVEY ANSWERS FOR A SPECIFIC USER AND SURVEY
async function updateSurveyAnswers(req, res) {
  const { user_id } = req.params;
  const { survey_id, answers } = req.body;

  try {
    // Fetch the survey using survey_id and user_id
    const survey = await client.db.Survey.filter({
      user_id,
      id: survey_id,
    }).getFirst();

    if (!survey) {
      return res.status(404).json({ error: "Survey not found" });
    }

    // Loop through the provided answers to update the Answer table accordingly
    for (const questionId in answers) {
      if (answers.hasOwnProperty(questionId)) {
        const { type, comment } = answers[questionId];

        // Find the specific answer entry in the database using survey_id and question_id
        const existingAnswer = await client.db.Answer.filter({
          survey_id: survey.id,
          question_id: { id: questionId },
        }).getFirst();

        if (existingAnswer) {
          // Update the answer in the Answer table using the correct columns
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
    await client.db.Survey.update(survey.id, {
      completion_time: adjustToGreeceTime(new Date()),
    });

    res.json({ success: true });
  } catch (error) {
    console.error("Error updating survey answers:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Function to check if a survey has all questions answered
async function isSurveyVersionFinished(survey_id) {
  try {
    // Fetch all answers related to this survey
    const answers = await client.db.Answer.filter({
      survey_id: survey_id,
    }).getAll();

    // If no answers are found, the survey is not finished
    if (!answers || answers.length === 0) {
      return { success: true, finished: false };
    }

    // Check if every answer has a non-null type or comment (indicating the question is answered)
    const allAnswered = answers.every((answer) => answer.type !== null);

    // Return the result
    return { success: true, finished: allAnswered };
  } catch (error) {
    console.error("Error checking if survey is finished:", error);
    return { success: false, error: "Internal Server Error" };
  }
}

// API function to check if a survey is finished and return the result
async function checkIfSurveyVersionIsFinished(req, res) {
  const { survey_id } = req.params;

  try {
    // Call the isSurveyVersionFinished function
    const result = await isSurveyVersionFinished(survey_id);

    // Return the result directly
    if (result.success) {
      return res.json({ success: true, finished: result.finished });
    } else {
      return res.status(500).json({ success: false, error: result.error });
    }
  } catch (error) {
    console.error("Error checking if survey is finished:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export {
  getSurveyAnswers,
  updateSurveyAnswers,
  isSurveyVersionFinished,
  checkIfSurveyVersionIsFinished,
};
