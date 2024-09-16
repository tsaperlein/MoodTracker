// CONTROLLERS - Welcome Mood

import dotenv from "dotenv";
dotenv.config();

import {
  fetchAllWelcomeMoods,
  fetchLatestWeekWelcomeMoods,
  handleCalculateAndSubmitWelcomeMood,
  fetchLatestWelcomeMood,
} from "../services/welcomeMood.mjs";

// Controller to get all welcome moods for a user
export async function getWelcomeMoods(req, res) {
  const { user_id } = req.params;

  try {
    const { success, welcomeMoods, error } = await fetchAllWelcomeMoods(
      user_id
    );

    if (!success) {
      // If the helper function returned an error, respond with that error message
      return res.status(500).json({ success: false, message: error });
    }

    // If successful, return the welcome moods in the response
    return res.status(200).json(welcomeMoods);
  } catch (error) {
    console.error("Error retrieving welcome moods:", error);
    return res.status(500).json({
      success: false,
      message: "Error retrieving welcome moods",
      error: error.message,
    });
  }
}

// Controller to get the latest week of welcome moods for a user
export async function getLatestWeekWelcomeMoods(req, res) {
  const { user_id } = req.params;

  try {
    const moodData = await fetchLatestWeekWelcomeMoods(user_id);
    return res.json(moodData);
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(500)
      .json({ message: "Error retrieving welcome moods", error });
  }
}

// Controller to submit a welcome mood for a user
export async function submitWelcomeMood(req, res) {
  const { user_id } = req.params;
  const { mood_type } = req.body || {}; // Fallback to an empty object

  try {
    const newChoice = await handleCalculateAndSubmitWelcomeMood(
      user_id,
      mood_type
    );
    return res.status(201).json(newChoice);
  } catch (error) {
    console.error("Error:", error);

    const statusCode =
      error.message === "Mood type is required" ||
      error.message === "Welcome mood not found"
        ? 400
        : 500;

    return res.status(statusCode).json({ message: error.message });
  }
}

// Controller to get the latest welcome mood for a user
export async function getLatestWelcomeMood(req, res) {
  const { user_id } = req.params;

  try {
    const latestMood = await fetchLatestWelcomeMood(user_id);
    return res.json(latestMood);
  } catch (error) {
    console.error("Error retrieving latest welcome mood:", error);
    return res
      .status(500)
      .json({ message: "Error retrieving latest welcome mood", error });
  }
}
