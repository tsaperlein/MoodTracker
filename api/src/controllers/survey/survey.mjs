// CONTROLLER - Survey

import dotenv from "dotenv";
dotenv.config();

import { getXataClient } from "../../xata.mjs";
const client = getXataClient();

import { isSurveyVersionFinished } from "./answer.mjs";
import {
  adjustToGreeceTime,
  areDatesOnDifferentDays,
} from "../../utils/datetime.mjs";

// Helper function to shuffle an array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Helper function to create a survey version with assigned questions
export async function createSurveyVersion(userId) {
  try {
    const lastSurvey = await client.db.Survey.filter({ user_id: userId })
      .sort("survey_id", "desc")
      .getFirst();

    let newSurveyId;
    let newVersion;
    let usedQuestionIds = [];

    if (lastSurvey) {
      const lastSurveyId = lastSurvey.survey_id;
      const lastVersion = await client.db.Survey.filter({
        user_id: userId,
        survey_id: lastSurveyId,
      })
        .sort("version", "desc")
        .getFirst();

      const lastSurveyFinished = await isSurveyVersionFinished(lastVersion.id);

      // Check if last version was 3 and it's NOT finished, then do nothing
      if (lastVersion.version === 3 && !lastSurveyFinished.finished) {
        console.log(
          `Survey version 3 for user ${userId} is not finished. No new survey will be created.`
        );
        return { success: false, message: "Survey version 3 not finished." };
      }

      // Check if last version was 3 and if it's finished
      if (lastVersion.version === 3 && lastSurveyFinished.finished) {
        newSurveyId = lastSurveyId + 1;
        newVersion = 1;
        usedQuestionIds = [];
      } else {
        newSurveyId = lastSurveyId;
        newVersion = lastVersion.version + 1;

        const previousVersions = await client.db.Survey.filter({
          user_id: userId,
          survey_id: lastSurveyId,
        }).getAll();

        for (const version of previousVersions) {
          const previousAnswers = await client.db.Answer.filter({
            survey_id: version.id,
          }).getAll();

          for (const answer of previousAnswers) {
            usedQuestionIds.push(answer.question_id.id);
          }
        }
      }
    } else {
      newSurveyId = 1;
      newVersion = 1;
    }

    const allQuestions = await client.db.Question.getAll();

    // If starting a new survey with version 1, use all questions
    let availableQuestions;
    if (newVersion === 1 && usedQuestionIds.length === 0) {
      availableQuestions = allQuestions;
    } else {
      availableQuestions = allQuestions.filter(
        (question) => !usedQuestionIds.includes(question.id)
      );
    }

    let numberOfQuestions;
    if (newVersion === 3) {
      numberOfQuestions = 5;
    } else {
      numberOfQuestions = Math.floor(allQuestions.length / 3);
    }

    const versionQuestions = shuffleArray(availableQuestions).slice(
      0,
      numberOfQuestions
    );

    // Create the new survey version
    const newSurvey = await client.db.Survey.create({
      survey_id: newSurveyId,
      version: newVersion,
      user_id: userId,
      posted_at: adjustToGreeceTime(new Date()),
      completion_time: null,
    });

    // Store the assigned questions for the survey
    for (const question of versionQuestions) {
      await client.db.Answer.create({
        survey_id: newSurvey.id,
        question_id: question.id,
        type: null,
        comment: null,
      });
    }

    return { success: true, surveyId: newSurveyId, version: newVersion };
  } catch (error) {
    console.error("Error creating survey version:", error);
    return { success: false, error: error.message };
  }
}

// Controller that uses createSurveyVersion for HTTP requests
async function createDailySurvey(req, res) {
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

async function findLatestCompleteSurvey(user_id) {
  try {
    // Fetch all surveys for the user, sorted by creation date in descending order
    const surveys = await client.db.Survey.filter({ user_id })
      .sort("posted_at", "desc")
      .getAll();

    if (!surveys || surveys.length === 0) {
      return {
        success: false,
        message: "No surveys found for this user.",
      };
    }

    // Track completed versions for each survey_id
    const surveyCompletionMap = {};

    // Iterate through the surveys to check completion
    for (const survey of surveys) {
      const result = await isSurveyVersionFinished(survey.id);

      if (result.success && result.finished) {
        // If the survey version is complete, track it
        if (!surveyCompletionMap[survey.survey_id]) {
          surveyCompletionMap[survey.survey_id] = new Set();
        }

        surveyCompletionMap[survey.survey_id].add(survey.version);

        // If all three versions (1, 2, 3) are complete, return the survey_id
        if (surveyCompletionMap[survey.survey_id].size === 3) {
          return {
            success: true,
            surveyId: survey.survey_id,
            message: "All three versions of the survey are completed.",
          };
        }
      }
    }

    // If no survey was found with all three versions completed
    return {
      success: false,
      message: "No survey found with all three versions completed.",
    };
  } catch (error) {
    console.error("Error finding the latest complete survey:", error.message);
    return {
      success: false,
      message: "Internal server error",
      error: error.message,
    };
  }
}

async function findLatestSurvey(user_id) {
  try {
    // Fetch the latest survey for the user
    const latestSurvey = await client.db.Survey.filter({ user_id })
      .sort("id", "desc")
      .getFirst();

    if (!latestSurvey) {
      return {
        success: false,
        message: "No surveys found for this user.",
      };
    }

    return {
      success: true,
      id: latestSurvey.id,
      surveyId: latestSurvey.survey_id,
      version: latestSurvey.version,
      postedAt: latestSurvey.posted_at,
      completion_time: latestSurvey.completion_time,
    };
  } catch (error) {
    console.error(
      "Error finding the latest survey and version:",
      error.message
    );
    return {
      success: false,
      message: "Internal server error",
      error: error.message,
    };
  }
}

async function getLatestSurvey(req, res) {
  const { user_id } = req.params;

  const result = await findLatestSurvey(user_id);

  if (result.success) {
    return res.status(200).json(result);
  } else if (result.message === "No surveys found for this user.") {
    return res.status(404).json({ message: result.message });
  } else {
    return res
      .status(500)
      .json({ message: result.message, error: result.error });
  }
}

async function getSurvey(req, res) {
  const { user_id, survey_id } = req.params;

  try {
    const survey = await client.db.Survey.filter({
      user_id: user_id,
      id: survey_id,
    }).getFirst();

    const surveyData = {
      id: survey.id,
      surveyId: survey.survey_id,
      version: survey.version,
      postedAt: survey.posted_at,
      completion_time: survey.completion_time,
    };

    return res.status(200).json(surveyData);
  } catch (error) {
    console.error(
      "Error finding the latest survey and version:",
      error.message
    );
    throw new Error("Internal server error");
  }
}

async function getPreviousSurveys(req, res) {
  const { user_id } = req.params;

  try {
    // Find the latest survey using the findLatestSurvey function
    const latestSurvey = await findLatestSurvey(user_id);

    if (!latestSurvey.success) {
      return res
        .status(404)
        .json({ message: "No surveys found for this user." });
    }

    // Fetch all surveys for the user
    let allSurveys = await client.db.Survey.filter({ user_id })
      .sort("id", "desc")
      .getAll();

    if (!allSurveys || allSurveys.length === 0) {
      return res
        .status(404)
        .json({ message: "No surveys found for this user." });
    }

    if (!allSurveys || allSurveys.length === 0) {
      return res
        .status(404)
        .json({ message: "No previous surveys found for this user." });
    }

    // Group surveys by survey_id
    const groupedSurveys = allSurveys.reduce((acc, survey) => {
      if (!acc[survey.survey_id]) {
        acc[survey.survey_id] = [];
      }
      acc[survey.survey_id].push(survey);
      return acc;
    }, {});

    // Prepare the survey groups to return
    let surveyGroups = Object.keys(groupedSurveys).map(async (surveyId) => {
      let versions = groupedSurveys[surveyId].sort(
        (a, b) => b.version - a.version
      );

      // Filter out the latest version if it is not finished
      const filteredVersions = [];
      for (const version of versions) {
        const isFinishedResponse = await isSurveyVersionFinished(version.id);

        if (isFinishedResponse.success && isFinishedResponse.finished) {
          filteredVersions.push(version);
        }
      }

      return {
        surveyId,
        versions: filteredVersions,
      };
    });

    // Resolve all promises in surveyGroups
    surveyGroups = await Promise.all(surveyGroups);

    // Filter out any surveys that no longer have versions after filtering
    surveyGroups = surveyGroups.filter((group) => group.versions.length > 0);

    return res.status(200).json(surveyGroups);
  } catch (error) {
    console.error("Error fetching user surveys:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function checkSurveyReadiness(user_id) {
  try {
    const latestSurvey = await findLatestSurvey(user_id);

    if (!latestSurvey.success || !latestSurvey) {
      return {
        status: false,
        message: "No survey found or an error occurred.",
        isReady: false,
      };
    }

    const { id, completion_time } = latestSurvey;

    // Check if the latest survey is finished
    const response = await isSurveyVersionFinished(id);

    if (!response.finished) {
      return {
        status: "not ready",
        message: "Latest survey is not finished yet.",
        isReady: false,
      };
    } else {
      // Get the day of the month for the current time and the completion time
      const currentDay = adjustToGreeceTime(new Date());
      const completionDay = new Date(completion_time);

      // Check if the days are different
      const isReady = areDatesOnDifferentDays(currentDay, completionDay);

      return {
        status: isReady ? "ready" : "not ready",
        isReady: isReady,
      };
    }
  } catch (error) {
    console.error("Error checking survey readiness:", error);
    throw error;
  }
}

// Function to check if the last survey is fulfilled and if the day numbers are different
async function isSurveyReadyForNextDay(req, res) {
  const { user_id } = req.params;

  try {
    const readinessStatus = await checkSurveyReadiness(user_id);

    // If the latest survey is finished and it's a different day, return the status
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

// Helper function to get the number of remaining versions
async function getRemainingVersionCount(user_id) {
  try {
    // Fetch the latest survey for the user (only need the last survey version and its completion time)
    const latestSurvey = await findLatestSurvey(user_id);

    // If no survey exists, assume all versions are remaining
    if (!latestSurvey) return 3;

    const { version, completion_time } = latestSurvey;

    // Return remaining versions based on the latest survey's version and completion status
    switch (version) {
      case 1:
        return completion_time ? 2 : 3; // Version 1 completed -> 2 remaining, otherwise 3 remaining
      case 2:
        return completion_time ? 1 : 2; // Version 2 completed -> 1 remaining, otherwise 2 remaining
      case 3:
        return completion_time ? 3 : 1; // Version 3 completed -> reset to 3, otherwise 1 remaining
      default:
        return 3; // Default to 3 if something unexpected happens
    }
  } catch (error) {
    console.error("Error getting remaining versions:", error.message);
    return 3; // Default to 3 if there's an error
  }
}

// Controller function to handle the API call and return the remaining versions
async function getRemainingVersions(req, res) {
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

export {
  createDailySurvey,
  findLatestCompleteSurvey,
  findLatestSurvey,
  getLatestSurvey,
  getSurvey,
  getPreviousSurveys,
  checkSurveyReadiness,
  isSurveyReadyForNextDay,
  getRemainingVersions,
};
