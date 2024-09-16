// SERVICES - Mood Level

import dotenv from "dotenv";
dotenv.config();

import { getXataClient } from "../xata.mjs";
const client = getXataClient();

import { findLatestSurveyScore } from "./score.mjs";
import { fetchLatestWelcomeMood } from "./welcomeMood.mjs";

// Utilities
import { adjustScoreBasedOnMood } from "../utils/scoreModifier.mjs";

// Service function to fetch the user's mood level
export async function fetchUserMoodLevel(user_id) {
  try {
    // Get the latest survey score
    let latestSurveyScoreResult = await findLatestSurveyScore(user_id);

    // If no survey score is found, set the mood level to undefined
    let moodLevel;
    if (latestSurveyScoreResult == null) {
      moodLevel = "undefined";
    } else {
      // Get the latest welcome mood
      let latestWelcomeMood = await fetchLatestWelcomeMood(user_id);

      // Check if the latest welcome mood is null
      if (latestWelcomeMood == null) {
        return {
          success: false,
          message: "No welcome mood found.",
        };
      }

      const moodType = latestWelcomeMood.welcome_mood_id?.type;

      // Check if the mood type is valid
      if (!moodType) {
        return {
          success: false,
          message: "Invalid mood type found.",
        };
      }

      // Adjust the survey score based on the mood
      const totalScore = adjustScoreBasedOnMood(
        latestSurveyScoreResult.totalScore,
        moodType
      );

      // Determine the mood level based on the total score
      if (totalScore >= 0 && totalScore <= 8) {
        moodLevel = "good";
      } else if (totalScore >= 9 && totalScore <= 17) {
        moodLevel = "mid";
      } else if (totalScore >= 18 && totalScore <= 26) {
        moodLevel = "bad";
      } else {
        moodLevel = "undefined";
      }
    }

    // Return the result
    return {
      success: true,
      moodLevel,
    };
  } catch (error) {
    console.error(
      "Error occurred while finding user mood level:",
      error.message
    );
    throw new Error("Error finding user mood level");
  }
}
