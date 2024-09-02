import dotenv from "dotenv";
dotenv.config();

import { getXataClient } from "../../xata.mjs";
import { adjustToGreeceTime } from "../../utils/datetime.mjs";
const client = getXataClient();

function calculateStreak(dates) {
  // If the dates array is null or contains only null values, return 0
  if (!dates || dates.length === 0 || dates.every((date) => date === null)) {
    return 0;
  }

  let streak = 0;
  let today = adjustToGreeceTime(new Date());
  let todayIncluded = false; // Flag to check if today is included in the streak

  for (let i = 0; i < dates.length; i++) {
    if (!dates[i]) {
      continue; // Skip null or invalid dates
    }

    // Normalize the date by removing the 'Z' and converting back to a Date object
    let date;
    try {
      date = new Date(dates[i].toISOString().slice(0, -1));
    } catch {
      continue; // Skip invalid dates
    }

    if (date.getUTCDate() === today.getUTCDate()) {
      todayIncluded = true;
    } else if (date.getUTCDate() === today.getUTCDate() - 1) {
      streak++;
      today.setDate(today.getUTCDate() - 1); // Move to the previous day
    } else {
      break; // Streak is broken
    }
  }

  // Add one to the streak if today is included
  if (todayIncluded) {
    streak++;
  }

  return streak;
}

async function calculateSurveysStreak(userId) {
  try {
    const surveys = await client.db.Survey.filter({ user_id: userId }).getAll();

    if (!surveys || surveys.length === 0) {
      return 0;
    }

    const surveyDates = surveys
      .map((survey) => survey.completion_time)
      .filter((date) => date !== null) // Filter out null values
      .sort((a, b) => new Date(b) - new Date(a));

    return calculateStreak(surveyDates);
  } catch {
    return 0;
  }
}

async function calculateWelcomeMoodStreak(userId) {
  try {
    const moods = await client.db.Chooses.filter({ user_id: userId })
      .select(["datetime", "welcome_mood_id.type"])
      .getAll();

    if (!moods || moods.length === 0) {
      return 0;
    }

    // Filter out moods with the type "nothing"
    const filteredMoods = moods
      .filter((mood) => mood.welcome_mood_id?.type !== "nothing")
      .map((mood) => mood.datetime)
      .sort((a, b) => new Date(b) - new Date(a));

    return calculateStreak(filteredMoods);
  } catch {
    return 0;
  }
}

async function getStreakCount(req, res) {
  const { user_id } = req.params;

  try {
    const surveyStreak = await calculateSurveysStreak(user_id);
    const moodStreak = await calculateWelcomeMoodStreak(user_id);

    // Calculate the total streak by taking the minimum of the two streaks
    const totalStreak = Math.min(surveyStreak, moodStreak);

    // Check if the totalStreak is null and handle it
    if (totalStreak == null) {
      return res.status(404).json({ message: "No streak data found." });
    }

    res.status(200).json({ totalStreak });
  } catch (error) {
    res.status(500).json({ error: "Failed to calculate streaks" });
  }
}

export { getStreakCount };
