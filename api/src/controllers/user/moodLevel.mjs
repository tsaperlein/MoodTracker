// CONTROLLER - User: Mood

import dotenv from "dotenv";
dotenv.config();

import { getXataClient } from "../../xata.mjs";
const client = getXataClient();

import { findLatestSurveyScore } from "../survey/score.mjs";
import { findLatestWelcomeMood } from "../welcomeMood.mjs";

import { adjustScoreBasedOnMood } from "../../utils/scoreModifier.mjs";

// Function to find and return the user's mood level
async function findUserMoodLevel(req, res) {
  const { user_id } = req.params;

  try {
    // Get the latest survey score
    let latestSurveyScore = await findLatestSurveyScore(user_id);

    // If no survey score is found, set the mood level to undefined
    let moodLevel;
    if (latestSurveyScore == null) {
      moodLevel = "undefined";
    } else {
      // Get the latest welcome mood
      let latestWelcomeMood = await findLatestWelcomeMood(user_id);

      // Check if latestWelcomeMood is null
      if (latestWelcomeMood == null) {
        return res.status(404).json({
          success: false,
          message: "No welcome mood found.",
        });
      }

      const moodType = latestWelcomeMood.welcome_mood_id?.type;

      console.log(latestSurveyScore, moodType);

      // Check if moodType is valid
      if (!moodType) {
        return res.status(404).json({
          success: false,
          message: "Invalid mood type found.",
        });
      }

      // Adjust the survey score based on the mood
      const totalScore = adjustScoreBasedOnMood(latestSurveyScore, moodType);

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

    // Return the final result in the response
    return res.json({
      success: true,
      moodLevel,
    });
  } catch (error) {
    console.error("Error occurred while finding user mood level:", error);
    return res.status(500).json({
      success: false,
      message: "Error finding user mood level",
      error: error.message,
    });
  }
}

export { findUserMoodLevel };
