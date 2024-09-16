// SERVICES - Survey

import dotenv from "dotenv";
dotenv.config();

import { getXataClient } from "../xata.mjs";
const client = getXataClient();

import { checkSurveyCompletionStatus } from "./answer.mjs";

// Utilities
import {
  adjustToGreeceTime,
  areDatesOnDifferentDays,
} from "../utils/datetime.mjs";
import { shuffleArray } from "../utils/array.mjs";

// Helper function to create a survey version with assigned questions
export async function createSurveyVersion(user_id) {
  try {
    // Find the latest survey for the user
    const {
      success: latestSurveySuccess,
      survey: lastSurvey,
      error: latestSurveyError,
    } = await findLatestSurvey(user_id);

    let newSurveyId;
    let newVersion;
    let usedQuestionIds = [];

    if (latestSurveySuccess && lastSurvey) {
      const lastSurveyId = lastSurvey.surveyId;

      // Find the last version for the latest survey
      const {
        success: versionSuccess,
        survey: lastVersion,
        error: versionError,
      } = await findLatestSurvey(user_id);

      // Check if the last survey version is finished
      const lastSurveyFinished = await checkSurveyCompletionStatus(
        lastVersion.id
      );

      // Check if last version was 3 and it's NOT finished, then do nothing
      if (lastVersion.version === 3 && !lastSurveyFinished.finished) {
        console.log(
          `Survey version 3 for user ${user_id} is not finished. No new survey will be created.`
        );
        return { success: false, message: "Survey version 3 not finished." };
      }

      // If the last version was 3 and it's finished, start a new survey (version 1)
      if (lastVersion.version === 3 && lastSurveyFinished.finished) {
        newSurveyId = lastSurveyId + 1;
        newVersion = 1;
        usedQuestionIds = []; // Reset used questions for a new survey
      } else {
        // Continue with the same survey but increment the version
        newSurveyId = lastSurveyId;
        newVersion = lastVersion.version + 1;

        // Collect used question IDs from previous versions
        const previousVersions = await client.db.Survey.filter({
          user_id,
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
      // If no previous survey exists, create a new survey
      newSurveyId = 1;
      newVersion = 1;
    }

    const allQuestions = await client.db.Question.getAll();

    // Determine available questions based on previous survey versions
    let availableQuestions;
    if (newVersion === 1 && usedQuestionIds.length === 0) {
      availableQuestions = allQuestions; // Use all questions for a new survey
    } else {
      availableQuestions = allQuestions.filter(
        (question) => !usedQuestionIds.includes(question.id)
      );
    }

    // Determine the number of questions based on the survey version
    let numberOfQuestions;
    if (newVersion === 3) {
      numberOfQuestions = 5; // Last version (3) uses fewer questions
    } else {
      numberOfQuestions = Math.floor(allQuestions.length / 3); // Split questions for version 1 and 2
    }

    // Randomly select the questions for this survey version
    const versionQuestions = shuffleArray(availableQuestions).slice(
      0,
      numberOfQuestions
    );

    // Create the new survey version
    const newSurvey = await client.db.Survey.create({
      survey_id: newSurveyId,
      version: newVersion,
      user_id,
      posted_at: adjustToGreeceTime(new Date()),
      completion_time: null,
    });

    // Store the assigned questions for the survey version
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

export async function findLatestCompleteSurvey(user_id) {
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
      const result = await checkSurveyCompletionStatus(survey.id);

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

// Function to find all surveys for a user
export async function findAllSurveysByUser(user_id) {
  try {
    // Fetch all surveys for the user from the database
    const surveys = await client.db.Survey.filter({ user_id })
      .sort("id", "desc")
      .getAll();

    if (!surveys || surveys.length === 0) {
      return { success: false, surveys: [], message: "No surveys found" };
    }

    return { success: true, surveys };
  } catch (error) {
    console.error("Error fetching surveys for user:", error);
    return { success: false, surveys: [], error: "Internal server error" };
  }
}

export async function findLatestSurvey(user_id) {
  try {
    // Fetch the latest survey for the user
    const latestSurvey = await client.db.Survey.filter({ user_id })
      .sort("posted_at", "desc")
      .getFirst();

    if (!latestSurvey) {
      return {
        success: false,
        error: "No surveys found for this user.",
      };
    }

    return {
      success: true,
      survey: {
        id: latestSurvey.id,
        surveyId: latestSurvey.survey_id,
        version: latestSurvey.version,
        postedAt: latestSurvey.posted_at,
        completionTime: latestSurvey.completion_time,
      },
    };
  } catch (error) {
    console.error(
      "Error finding the latest survey and version:",
      error.message
    );
    return {
      success: false,
      error: "Internal server error",
    };
  }
}

// Service function to fetch survey by user ID and survey ID
export async function findSurvey(user_id, survey_id) {
  try {
    const survey = await client.db.Survey.filter({
      user_id,
      id: survey_id,
    }).getFirst();

    if (!survey) {
      return { success: false, error: "Survey not found." };
    }

    return {
      success: true,
      survey: {
        id: survey.id,
        surveyId: survey.survey_id,
        version: survey.version,
        postedAt: survey.posted_at,
        completionTime: survey.completion_time,
      },
    };
  } catch (error) {
    console.error(
      `Error fetching survey ${survey_id} for user ${user_id}:`,
      error
    );
    return {
      success: false,
      error: "Error fetching the survey from the database.",
    };
  }
}

export async function findPreviousSurveys(user_id) {
  try {
    // Find the latest survey using the findLatestSurvey function
    const latestSurveyResult = await findLatestSurvey(user_id);

    // If the latest survey is not found or there's an error, return an empty array
    if (!latestSurveyResult.success) {
      console.error(latestSurveyResult.error);
      return [];
    }

    // Use the findAllSurveysByUser function to fetch all surveys for the user
    const {
      success: allSurveysSuccess,
      surveys,
      error: allSurveysError,
    } = await findAllSurveysByUser(user_id);

    if (!allSurveysSuccess || surveys.length === 0) {
      console.error(allSurveysError || "No surveys found for the user.");
      return [];
    }

    // Group surveys by survey_id
    const groupedSurveys = surveys.reduce((acc, survey) => {
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
        const isFinishedResponse = await checkSurveyCompletionStatus(
          version.id
        );

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
    return surveyGroups.filter((group) => group.versions.length > 0);
  } catch (error) {
    console.error("Error fetching user surveys:", error);
    throw new Error("Internal server error");
  }
}

export async function checkSurveyReadiness(user_id) {
  try {
    // Fetch the latest survey for the user
    const { success, survey, error } = await findLatestSurvey(user_id);

    if (!success || !survey) {
      console.error(error || "No survey found.");
      return {
        status: false,
        message: error || "No survey found or an error occurred.",
        isReady: false,
      };
    }

    const { id, completionTime } = survey;

    // Check if the latest survey version is finished
    const {
      success: finishedSuccess,
      finished,
      error: finishedError,
    } = await checkSurveyCompletionStatus(id);

    if (!finishedSuccess || !finished) {
      return {
        status: "not ready",
        message: finishedError || "Latest survey is not finished yet.",
        isReady: false,
      };
    }

    // Check if the completion time is from a different day than today
    const currentDay = adjustToGreeceTime(new Date());
    const completionDay = new Date(completionTime);

    const isReady = areDatesOnDifferentDays(currentDay, completionDay);

    return {
      status: isReady ? "ready" : "not ready",
      isReady,
    };
  } catch (error) {
    console.error("Error checking survey readiness:", error);
    return {
      status: false,
      message: "Internal server error",
      isReady: false,
    };
  }
}

// Helper function to get the number of remaining versions
export async function getRemainingVersionCount(user_id) {
  try {
    // Fetch the latest survey for the user
    const { success, survey, error } = await findLatestSurvey(user_id);

    // If no survey exists or there's an error, assume all versions are remaining
    if (!success || !survey) {
      console.error(error || "No survey found for the user.");
      return 3; // Return 3 versions as remaining by default
    }

    const { version, completionTime } = survey;

    // Return remaining versions based on the latest survey's version and completion status
    switch (version) {
      case 1:
        return completionTime ? 2 : 3; // Version 1 completed -> 2 remaining, otherwise 3 remaining
      case 2:
        return completionTime ? 1 : 2; // Version 2 completed -> 1 remaining, otherwise 2 remaining
      case 3:
        return completionTime ? 0 : 1; // Version 3 completed -> 0 remaining, otherwise 1 remaining
      default:
        console.error(
          `Unexpected version ${version}. Defaulting to 3 remaining versions.`
        );
        return 3; // Default to 3 if the version is unexpected
    }
  } catch (error) {
    console.error("Error getting remaining versions:", error.message);
    return 3; // Default to 3 if there's an error
  }
}
