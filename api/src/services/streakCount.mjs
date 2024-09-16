// SERVICES - Streak

import dotenv from "dotenv";
dotenv.config();

import { getXataClient } from "../xata.mjs";
const client = getXataClient();

// Utilities
import { adjustToGreeceTime } from "../utils/datetime.mjs";

import { findAllSurveysByUser } from "./survey.mjs";

// Helper function to calculate streaks
export function calculateStreak(dates) {
  if (!dates || dates.length === 0 || dates.every((date) => date === null)) {
    return 0;
  }

  let streak = 0;
  let today = adjustToGreeceTime(new Date());
  let todayIncluded = false;

  for (let i = 0; i < dates.length; i++) {
    if (!dates[i]) {
      continue;
    }

    let date;
    try {
      date = new Date(dates[i].toISOString().slice(0, -1));
    } catch {
      continue;
    }

    if (date.getUTCDate() === today.getUTCDate()) {
      todayIncluded = true;
    } else if (date.getUTCDate() === today.getUTCDate() - 1) {
      streak++;
      today.setDate(today.getUTCDate() - 1);
    } else {
      break;
    }
  }

  if (todayIncluded) {
    streak++;
  }

  return streak;
}

// Service function to calculate surveys streak
export async function calculateSurveysStreak(user_id) {
  try {
    // Use the findAllSurveysByUser function to fetch all surveys for the user
    const {
      success: allSurveysSuccess,
      surveys,
      error: allSurveysError,
    } = await findAllSurveysByUser(user_id);

    // Handle error or no surveys found case
    if (!allSurveysSuccess || !surveys || surveys.length === 0) {
      console.error(allSurveysError || "No surveys found for the user.");
      return 0; // Return 0 streak if no surveys are found
    }

    // Extract completion times and filter out null dates
    const surveyDates = surveys
      .map((survey) => survey.completion_time)
      .filter((date) => date !== null)
      .sort((a, b) => new Date(b) - new Date(a)); // Sort dates in descending order

    // Calculate streak based on the survey completion dates
    return calculateStreak(surveyDates);
  } catch (error) {
    console.error("Error calculating surveys streak:", error.message);
    return 0; // Return 0 streak in case of an error
  }
}

// Service function to calculate welcome mood streak
export async function calculateWelcomeMoodStreak(user_id) {
  try {
    const moods = await client.db.Chooses.filter({ user_id })
      .select(["datetime", "welcome_mood_id.type"])
      .getAll();

    if (!moods || moods.length === 0) {
      return 0;
    }

    const filteredMoods = moods
      .filter((mood) => mood.welcome_mood_id?.type !== "nothing")
      .map((mood) => mood.datetime)
      .sort((a, b) => new Date(b) - new Date(a));

    return calculateStreak(filteredMoods);
  } catch {
    return 0;
  }
}

// Service function to fetch the total streak count
export async function fetchStreakCount(user_id) {
  try {
    const surveyStreak = await calculateSurveysStreak(user_id);
    const moodStreak = await calculateWelcomeMoodStreak(user_id);

    return Math.min(surveyStreak, moodStreak);
  } catch (error) {
    console.error("Error calculating streak:", error);
    throw new Error("Failed to calculate streak");
  }
}
