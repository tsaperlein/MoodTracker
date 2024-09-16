// CONTROLLERS - Survey

import dotenv from "dotenv";
dotenv.config();

import {
  checkSurveyReadiness,
  createSurveyVersion,
  findLatestSurvey,
  findPreviousSurveys,
  findSurvey,
  getRemainingVersionCount,
} from "../services/survey.mjs";

// Controller that uses createSurveyVersion for HTTP requests
export async function createDailySurvey(req, res) {
  const { user_id } = req.params;
  const result = await createSurveyVersion(user_id);

  if (result.success) {
    return res.status(201).json({
      message: `Survey version ${result.version} created for survey ID ${result.surveyId}.`,
    });
  } else {
    return res
      .status(500)
      .json({ message: "Internal server error", error: result.error });
  }
}

export async function getLatestSurvey(req, res) {
  const { user_id } = req.params;

  try {
    // Attempt to find the latest survey
    const result = await findLatestSurvey(user_id);

    // Handle different outcomes based on the result
    if (result.success) {
      return res.status(200).json(result.survey);
    } else if (result.message === "No surveys found for this user.") {
      return res.status(404).json({ message: result.message });
    } else {
      return res
        .status(500)
        .json({ message: result.message, error: result.error });
    }
  } catch (error) {
    // Catch any unexpected errors and log them
    console.error("Error finding the latest survey:", error.message);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}

export async function getSurvey(req, res) {
  const { user_id, survey_id } = req.params;

  try {
    // Call the service function to get the survey data
    const result = await findSurvey(user_id, survey_id);

    // If no survey is found, return a 404 error
    if (!result) {
      return res.status(404).json({ message: "Survey not found." });
    }

    // Return the survey data
    return res.status(200).json(result.survey);
  } catch (error) {
    console.error("Error finding the survey:", error.message);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}

export async function getPreviousSurveys(req, res) {
  const { user_id } = req.params;

  try {
    // Call the service function to fetch the previous surveys
    const previousSurveys = await findPreviousSurveys(user_id);

    if (previousSurveys.length === 0) {
      return res
        .status(404)
        .json({ message: "No previous surveys found for this user." });
    }

    return res.status(200).json(previousSurveys);
  } catch (error) {
    console.error("Error fetching user surveys:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}

// Function to check if the last survey is fulfilled and if the day numbers are different
export async function isSurveyReadyForNextDay(req, res) {
  const { user_id } = req.params;

  try {
    const readinessStatus = await checkSurveyReadiness(user_id);
    return res.status(200).json(readinessStatus);
  } catch (error) {
    console.error(
      "Error checking if the survey is ready for the next day:",
      error
    );
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}

// Controller function to handle the API call and return the remaining versions
export async function getRemainingVersions(req, res) {
  const { user_id } = req.params;

  try {
    const remainingVersions = await getRemainingVersionCount(user_id);
    return res.status(200).json({ remainingVersions });
  } catch (error) {
    console.error("Error in getRemainingVersions:", error.message);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}
