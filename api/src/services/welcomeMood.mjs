// SERVICES - Welcome Mood

import dotenv from "dotenv";
dotenv.config();

import { getXataClient } from "../xata.mjs";
const client = getXataClient();

// Utilities
import { adjustToGreeceTime } from "../utils/datetime.mjs";

// Helper function to fetch all welcome moods for a user
export async function fetchAllWelcomeMoods(user_id) {
  try {
    const welcomeMoods = await client.db.Chooses.filter({ user_id })
      .select(["*", "welcome_mood_id.type"])
      .getAll();

    return { success: true, welcomeMoods };
  } catch (error) {
    console.error("Error fetching welcome moods:", error);
    return { success: false, error: "Error retrieving welcome moods" };
  }
}

// Service function to fetch the latest week of welcome moods for a user
export async function fetchLatestWeekWelcomeMoods(user_id) {
  try {
    // Use the fetchAllWelcomeMoods helper function to get all welcome moods for the user
    const { success, welcomeMoods, error } = await fetchAllWelcomeMoods(
      user_id
    );

    if (!success) {
      console.error(error);
      throw new Error(error);
    }

    // Normalize datetime by removing the 'Z' and converting back to Date objects
    const normalizedMoods = welcomeMoods.map((mood) => ({
      ...mood,
      datetime: mood.datetime,
    }));

    // Sort the moods by datetime in descending order (latest first)
    const sortedMoods = normalizedMoods.sort(
      (a, b) => new Date(b.datetime) - new Date(a.datetime)
    );

    // Take only the last 7 moods
    const latestWeekMoods = sortedMoods.slice(0, 7);

    // Extract both the mood types and their corresponding datetimes
    const moodData = latestWeekMoods.map((mood) => ({
      type: mood.welcome_mood_id?.type ?? "nothing",
      datetime: mood.datetime,
    }));

    return moodData;
  } catch (error) {
    console.error("Error fetching latest week welcome moods:", error);
    throw new Error("Error retrieving latest week welcome moods");
  }
}

// Service function to calculate and submit a welcome mood for a user
export async function handleCalculateAndSubmitWelcomeMood(user_id, mood_type) {
  try {
    // Validate mood_type input
    if (!mood_type) {
      throw new Error("Mood type is required");
    }

    // Fetch the welcome mood based on the mood type
    const welcomeMood = await client.db.WelcomeMood.filter({
      type: mood_type,
    }).getFirst();

    // If no mood is found, throw an error
    if (!welcomeMood) {
      throw new Error("Welcome mood not found");
    }

    // Create a new choice with the selected welcome mood
    const newChoice = await client.db.Chooses.create({
      user_id,
      welcome_mood_id: welcomeMood.id,
      datetime: adjustToGreeceTime(new Date()),
    });

    return newChoice;
  } catch (error) {
    console.error(
      "Error calculating and submitting welcome mood:",
      error.message
    );
    throw new Error(
      error.message || "Error calculating and submitting welcome mood"
    );
  }
}

// Service function to fetch the latest welcome mood for a user
export async function fetchLatestWelcomeMood(user_id) {
  try {
    const latestMood = await client.db.Chooses.filter({ user_id })
      .select(["welcome_mood_id", "datetime"])
      .sort("datetime", "desc")
      .getFirst();

    return latestMood;
  } catch (error) {
    console.error("Error finding latest welcome mood:", error);
    throw new Error("Error retrieving latest welcome mood");
  }
}
