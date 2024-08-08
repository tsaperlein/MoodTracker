import dotenv from "dotenv";
dotenv.config();

import { getXataClient } from "../xata.mjs";
const client = getXataClient();

// GET SURVEY ANSWERS FOR A SPECIFIC USER AND SURVEY
async function getSurveyAnswers(req, res) {
  const { survey_id, version } = req.params;

  try {
    // Fetch the specific survey using survey_id and version
    const survey = await client.db.Survey.filter({
      survey_id: parseInt(survey_id, 10), // Ensure survey_id is treated as an integer
      version: parseInt(version, 10), // Ensure version is treated as an integer
    }).getFirst();

    if (!survey) {
      return res.status(404).json({ error: "Survey not found" });
    }

    // Fetch the answers related to this survey using the survey's ID
    const answers = await client.db.Answer.filter({
      survey_id: survey.id, // Use the survey's internal ID to fetch related answers
    })
      .select(["type", "comment", "question_id.text"]) // Select the required fields
      .getAll();

    if (answers.length === 0) {
      return res
        .status(404)
        .json({ error: "No answers found for this survey." });
    }

    const formattedAnswers = answers.map((answer) => ({
      question: answer.question_id.text,
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
async function updateDailySurveyAnswers(req, res) {
  const { user_id, survey_id, answers } = req.body;

  try {
    // Fetch the survey using survey_id and user_id
    const survey = await client.db.Survey.filter({
      survey_id: parseInt(survey_id, 10),
      "user_id.id": user_id,
    }).getFirst();

    if (!survey) {
      return res.status(404).json({ error: "Survey not found" });
    }

    // Fetch the answers associated with the survey
    const surveyAnswers = await client.db.Answer.filter({
      survey_id: survey.id,
    }).getAll();

    console.log(surveyAnswers);

    if (!surveyAnswers || surveyAnswers.length === 0) {
      return res
        .status(404)
        .json({ error: "No answers found for this survey." });
    }

    // Loop through the answers and update the Answer table accordingly
    surveyAnswers.forEach(async (answer, index) => {
      const answerData = answers[index + 1]; // answers are 1-indexed

      if (answerData) {
        const { type, comment } = answerData;

        // Update the answer in the Answer table using the correct columns
        await client.db.Answer.update(answer.id, {
          type: type,
          comment: comment,
        });
      }
    });

    // Capture the current time as the completion time
    const completionTime = new Date().toISOString();

    // Update the completion time in the Survey table
    await client.db.Survey.update(survey.id, {
      completion_time: completionTime,
    });

    res.json({ success: true });
  } catch (error) {
    console.error("Error updating survey answers:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export { getSurveyAnswers, updateDailySurveyAnswers };
