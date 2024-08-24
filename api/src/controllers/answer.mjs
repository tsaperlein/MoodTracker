import dotenv from "dotenv";
dotenv.config();

import { startOfDay, subDays } from "date-fns";

import { getXataClient } from "../xata.mjs";
const client = getXataClient();

// GET SURVEY ANSWERS FOR A SPECIFIC USER AND SURVEY
async function getSurveyAnswers(req, res) {
  const { user_id, survey_id, version } = req.params;

  try {
    // Fetch the specific survey using survey_id and version
    const survey = await client.db.Survey.filter({
      user_id: user_id,
      survey_id: parseInt(survey_id, 10),
      version: parseInt(version, 10),
    }).getFirst();

    if (!survey) {
      return res.status(404).json({ error: "Survey not found" });
    }

    // Fetch the answers related to this survey using the survey's ID
    const answers = await client.db.Answer.filter({
      survey_id: survey.id,
    })
      .select(["type", "comment", "question_id.text"]) // Select the required fields
      .getAll();

    if (answers.length === 0) {
      return res
        .status(404)
        .json({ error: "No answers found for this survey." });
    }

    const formattedAnswers = answers.map((answer) => ({
      question: answer.question_id,
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
      user_id: user_id,
    })
      .sort("version", "desc")
      .getFirst();

    if (!survey) {
      return res.status(404).json({ error: "Survey not found" });
    }

    // Fetch the answers associated with the survey
    const surveyAnswers = await client.db.Answer.filter({
      survey_id: survey.id,
    }).getAll();

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

// Function to calculate the score of a single survey version based on xata_id
async function calculateSurveyVersionScore(surveyId) {
  try {
    // Fetch the answers associated with the survey version
    const answers = await client.db.Answer.filter({
      survey_id: surveyId,
    })
      .select(["type"])
      .getAll();

    // Check if answers is undefined or not an array
    if (!answers || !Array.isArray(answers)) {
      throw new Error(
        "Unexpected response format: answers data is undefined or not an array."
      );
    }

    // Initialize the score for this version
    let versionScore = 0;

    // Calculate the score based on answer type
    for (const answer of answers) {
      switch (answer.type) {
        case "Not True":
          versionScore += 0;
          break;
        case "Sometimes":
          versionScore += 1;
          break;
        case "True":
          versionScore += 2;
          break;
        default:
          break;
      }
    }

    return versionScore;
  } catch (error) {
    console.error(
      "An error occurred while calculating the survey version score:",
      error
    );
    throw error;
  }
}

// Function to calculate the total score for all versions of a survey based on survey_id
async function calculateSurveyScore(survey_id) {
  try {
    // Fetch all versions of the survey (1, 2, and 3) using the provided survey_id
    const surveys = await client.db.Survey.filter({
      survey_id: survey_id,
    }).getAll();

    // Check if all versions (1, 2, 3) exist
    if (surveys.length !== 3) {
      throw new Error(
        `Survey with ID ${survey_id} does not have all three versions (1, 2, 3).`
      );
    }

    // Initialize the total score
    let totalScore = 0;

    // Loop through each survey version and calculate its score
    for (const survey of surveys) {
      const versionScore = await calculateSurveyVersionScore(survey.id);
      totalScore += versionScore;
    }

    const version1 = await client.db.Survey.filter({
      survey_id: survey_id,
      version: 1,
    }).getFirst();

    const version3 = await client.db.Survey.filter({
      survey_id: survey_id,
      version: 3,
    }).getFirst();

    const startDate = version1.posted_at;
    const endDate = version3.posted_at;

    // Return the total score along with the start and end date of the survey
    return {
      totalScore,
      startDate,
      endDate,
    };
  } catch (error) {
    console.error(
      "An error occurred while calculating the survey score:",
      error
    );
    throw error;
  }
}

// Function to get the latest 10 fully completed surveys and calculate their scores
async function getLatestSurveysAndScores(req, res) {
  const { user_id } = req.params;

  try {
    // Fetch all surveys for the user, sorted by survey_id in descending order
    const allSurveys = await client.db.Survey.filter({ user_id: user_id })
      .sort("survey_id", "desc")
      .getAll();

    // Group surveys by survey_id
    const surveyGroups = allSurveys.reduce((groups, survey) => {
      if (!groups[survey.survey_id]) {
        groups[survey.survey_id] = [];
      }
      groups[survey.survey_id].push(survey);
      return groups;
    }, {});

    // Filter and map valid survey IDs (those that have versions 1, 2, 3)
    const validSurveyIds = Object.entries(surveyGroups)
      .filter(
        ([, surveys]) =>
          surveys
            .map((survey) => survey.version)
            .sort()
            .join(",") === "1,2,3"
      )
      .map(([survey_id]) => Number(survey_id));

    // Get the latest 10 survey IDs
    const latestSurveyIds = validSurveyIds.slice(-10);

    // Calculate scores for the latest surveys
    const results = await Promise.all(
      latestSurveyIds.map((survey_id) => calculateSurveyScore(survey_id))
    );

    return res.json({ success: true, results });
  } catch (error) {
    console.error("Error in getLatestSurveyScores:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

export {
  getSurveyAnswers,
  updateDailySurveyAnswers,
  getLatestSurveysAndScores,
};
