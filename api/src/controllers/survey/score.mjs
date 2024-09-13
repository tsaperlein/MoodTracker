// CONTROLLER - Score

import dotenv from "dotenv";
dotenv.config();

import { getXataClient } from "../../xata.mjs";
import { findLatestCompleteSurvey } from "./survey.mjs";
import { isSurveyVersionFinished } from "./answer.mjs";
const client = getXataClient();

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
async function calculateSurveyScore(userId, surveyId) {
  try {
    const surveys = await client.db.Survey.filter({
      user_id: userId,
      survey_id: surveyId,
    }).getAll();

    // Check if all required versions (1, 2, 3) exist
    const requiredVersions = [1, 2, 3];
    const surveyVersions = new Set(surveys.map((survey) => survey.version));

    if (requiredVersions.some((version) => !surveyVersions.has(version))) {
      // If not all required versions exist, return without doing anything
      return;
    }

    // Initialize the total score
    let totalScore = 0;

    // Loop through each survey version and check if it is finished
    for (const survey of surveys) {
      const { finished } = await isSurveyVersionFinished(survey.id);

      if (!finished) {
        // If any version is not finished, exit early
        return;
      }

      const versionScore = await calculateSurveyVersionScore(survey.id);
      totalScore += versionScore;
    }

    // Fetch version 1 and version 3 for start and end dates
    const version1 = surveys.find((survey) => survey.version === 1);
    const version3 = surveys.find((survey) => survey.version === 3);

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
    // You may choose to log the error but not throw it
  }
}

// Function to find the latest survey score for a user
async function findLatestSurveyScore(userId) {
  try {
    // Get the latest survey for the user
    const latestSurvey = await findLatestCompleteSurvey(userId);

    // If no survey is found or the latest survey is incomplete, return null
    if (!latestSurvey || !latestSurvey.success) {
      return null;
    }

    // Calculate the score for the latest survey
    const surveyScore = await calculateSurveyScore(
      userId,
      latestSurvey.surveyId
    );

    // Check if the survey score is undefined or null, return null in that case
    if (surveyScore?.totalScore == null) {
      return null;
    }

    // Return just the totalScore as required
    return surveyScore.totalScore;
  } catch (error) {
    // Handle errors silently or log them if needed
    return null;
  }
}

// Function to get the latest 10 fully completed surveys and calculate their scores
async function getLatestSurveysAndScores(req, res) {
  const { user_id } = req.params;

  try {
    // Fetch all surveys for the user, sorted by survey_id in descending order
    const allSurveys = await client.db.Survey.filter({ user_id })
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

    // Get the last 10 survey IDs (latest)
    const latestSurveyIds = validSurveyIds.slice(-10);

    // Calculate scores for the latest surveys
    const results = await Promise.all(
      latestSurveyIds.map((survey_id) =>
        calculateSurveyScore(user_id, survey_id)
      )
    );

    return res.json({ success: true, results });
  } catch (error) {
    console.error("Error in getLatestSurveyScores:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getAllSurveysAndScores(req, res) {
  const { user_id } = req.params;

  try {
    // Fetch all surveys for the user, sorted by survey_id in descending order
    const allSurveys = await client.db.Survey.filter({ user_id })
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
      .filter(([_, surveys]) => {
        const versions = surveys.map((survey) => survey.version).sort();
        return versions.join(",") === "1,2,3";
      })
      .map(([survey_id]) => Number(survey_id));

    // Calculate scores for the valid surveys
    const results = await Promise.all(
      validSurveyIds.map(async (survey_id) => {
        try {
          return await calculateSurveyScore(user_id, survey_id);
        } catch (error) {
          console.error(
            `Error calculating score for survey ${survey_id}:`,
            error
          );
          return { survey_id, error: error.message };
        }
      })
    );

    return res.json({ success: true, results });
  } catch (error) {
    console.error("Error in getAllSurveysAndScores:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

// New function to get the score of a specific survey version
async function getSurveyVersionScore(req, res) {
  const { survey_id } = req.params;

  try {
    // Calculate the score for the specified survey version
    const versionScore = await calculateSurveyVersionScore(survey_id);

    // Return the calculated score
    return res.json({ success: true, versionScore });
  } catch (error) {
    console.error(
      "An error occurred while retrieving the survey version score:",
      error
    );
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

export {
  calculateSurveyScore,
  findLatestSurveyScore,
  getLatestSurveysAndScores,
  getAllSurveysAndScores,
  getSurveyVersionScore,
};
