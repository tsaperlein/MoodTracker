// SERVICES - Score

import dotenv from "dotenv";
dotenv.config();

import { getXataClient } from "../xata.mjs";
const client = getXataClient();

import { checkSurveyCompletionStatus } from "./answer.mjs";
import { findLatestSurvey } from "./survey.mjs";

// Function to calculate the score of a single survey version based on survey_id
export async function calculateSurveyVersionScore(survey_id) {
  try {
    const answers = await client.db.Answer.filter({
      survey_id,
    })
      .select(["type"])
      .getAll();

    if (!answers || !Array.isArray(answers)) {
      throw new Error("Answers data is undefined or not an array.");
    }

    let versionScore = 0;

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
    console.error("Error calculating the survey version score:", error);
    throw error;
  }
}

// Function to calculate the total score for all versions of a survey based on survey_id
export async function calculateSurveyScore(user_id, survey_id) {
  try {
    const surveys = await client.db.Survey.filter({
      user_id,
      survey_id,
    }).getAll();

    // Check if all required versions (1, 2, 3) exist
    const requiredVersions = [1, 2, 3];
    const surveyVersions = new Set(surveys.map((survey) => survey.version));

    if (requiredVersions.some((version) => !surveyVersions.has(version))) {
      throw new Error("No required survey versions");
      return;
    }

    // Initialize the total score
    let totalScore = 0;

    // Loop through each survey version and check if it is finished
    for (const survey of surveys) {
      const { finished } = await checkSurveyCompletionStatus(survey.id);

      if (!finished) {
        throw new Error("Not all versions are finished");
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

// Function to calculate the latest survey score for a user that has all versions (1, 2, 3) completed
export async function findLatestSurveyScore(user_id) {
  try {
    // Fetch all surveys for the user, sorted by posted_at in descending order (newest first)
    const allSurveys = await client.db.Survey.filter({ user_id })
      .sort("posted_at", "desc") // Sort by posted_at in descending order
      .getAll();

    if (!allSurveys || allSurveys.length === 0) {
      return { success: false, message: "No surveys found for this user." };
    }

    // Group surveys by survey_id
    const surveyGroups = allSurveys.reduce((groups, survey) => {
      if (!groups[survey.survey_id]) {
        groups[survey.survey_id] = [];
      }
      groups[survey.survey_id].push(survey);
      return groups;
    }, {});

    // Sort the survey groups by the oldest `posted_at` date within each group (ascending)
    const sortedSurveyGroups = Object.entries(surveyGroups).sort(
      ([, surveysA], [, surveysB]) =>
        new Date(surveysA[0].posted_at) - new Date(surveysB[0].posted_at)
    );

    // Reverse the sortedSurveyGroups to iterate from the last item to the first one
    const reversedSurveyGroups = sortedSurveyGroups.reverse();

    // Iterate over the reversed survey groups (from the last to the first)
    for (const [survey_id, surveys] of reversedSurveyGroups) {
      const surveyVersions = surveys.map((survey) => survey.version);

      // Check if all required versions (1, 2, 3) are present
      const hasAllRequiredVersions = [1, 2, 3].every((version) =>
        surveyVersions.includes(version)
      );

      if (hasAllRequiredVersions) {
        // Check if all versions are finished
        const allFinished = await Promise.all(
          surveys.map(async (survey) => {
            const { finished } = await checkSurveyCompletionStatus(survey.id);
            return finished;
          })
        );

        if (!survey_id) break;

        // If all surveys are finished, calculate the score for this survey group
        if (allFinished.every(Boolean)) {
          return await calculateSurveyScore(user_id, parseInt(survey_id));
        } else {
          break;
        }
      }
    }

    // If no complete survey was found, return an error message
    return {
      success: false,
      message:
        "No fully completed survey with all versions (1, 2, 3) was found.",
    };
  } catch (error) {
    console.error("Error finding the latest survey score:", error);
    return {
      success: false,
      message: "Error finding the latest survey score.",
    };
  }
}

// Helper function to fetch survey groups and calculate scores (with limit)
async function fetchSurveyScores(user_id, limit = null) {
  try {
    const allSurveys = await client.db.Survey.filter({ user_id })
      .sort("survey_id", "desc")
      .getAll();

    const surveyGroups = allSurveys.reduce((groups, survey) => {
      if (!groups[survey.survey_id]) {
        groups[survey.survey_id] = [];
      }
      groups[survey.survey_id].push(survey);
      return groups;
    }, {});

    const validSurveyIds = Object.entries(surveyGroups)
      .filter(
        ([_, surveys]) =>
          surveys
            .map((survey) => survey.version)
            .sort()
            .join(",") === "1,2,3"
      )
      .map(([survey_id]) => Number(survey_id));

    const surveyIdsToProcess = limit
      ? validSurveyIds.slice(-limit)
      : validSurveyIds;

    const results = await Promise.all(
      surveyIdsToProcess.map(async (survey_id) => {
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

    return results;
  } catch (error) {
    console.error("Error fetching survey scores:", error);
    throw error;
  }
}

// Function to fetch the latest 10 fully completed surveys and their scores
export async function fetchLatestSurveyScores(user_id) {
  return fetchSurveyScores(user_id, 10);
}

// Function to fetch all surveys and their scores
export async function fetchAllSurveyScores(user_id) {
  return fetchSurveyScores(user_id);
}
