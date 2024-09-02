// CONTROLLER - Welcome Mood

import dotenv from "dotenv";
dotenv.config();

import { getXataClient } from "../xata.mjs";
const client = getXataClient();

// Utilities
import { adjustToGreeceTime } from "../utils/datetime.mjs";

// GET USER WELCOME MOODS
async function getWelcomeMoods(req, res) {
  const { user_id } = req.params;

  try {
    // Fetch the welcome moods along with the associated mood type from the WelcomeMood table
    const welcomeMoods = await client.db.Chooses.filter({ user_id })
      .select(["*", "welcome_mood_id.type"])
      .getAll();

    return res.json(welcomeMoods);
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(500)
      .json({ message: "Error retrieving welcome moods", error });
  }
}

// GET LATEST WEEK WELCOME MOODS
async function getLatestWeekWelcomeMoods(req, res) {
  const { user_id } = req.params;

  try {
    // Fetch all welcome moods along with the associated mood type from the WelcomeMood table
    const welcomeMoods = await client.db.Chooses.filter({ user_id })
      .select(["*", "welcome_mood_id.type"])
      .getAll();

    // Normalize datetime by removing the 'Z' and converting back to Date objects
    const normalizedMoods = welcomeMoods.map((mood) => ({
      ...mood,
      datetime: new Date(mood.datetime.toISOString().slice(0, -1)), // Remove 'Z' and convert back to Date
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

    return res.json(moodData);
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(500)
      .json({ message: "Error retrieving welcome moods", error });
  }
}

async function calculateAndSubmitWelcomeMood(user_id, mood_type) {
  if (!mood_type) {
    throw new Error("Mood type is required");
  }

  // Find the welcome mood by its type
  const welcomeMood = await client.db.WelcomeMood.filter({
    type: mood_type,
  }).getFirst();

  if (!welcomeMood) {
    throw new Error("Welcome mood not found");
  }

  // Create the new choice
  const newChoice = await client.db.Chooses.create({
    user_id,
    welcome_mood_id: welcomeMood.id,
    datetime: adjustToGreeceTime(new Date()),
  });

  return newChoice;
}

// SUBMIT WELCOME MOOD
async function submitWelcomeMood(req, res) {
  const { user_id } = req.params;
  const { mood_type } = req.body || {}; // Fallback to an empty object

  try {
    const newChoice = await calculateAndSubmitWelcomeMood(user_id, mood_type);

    // Return the result
    return res.status(201).json(newChoice);
  } catch (error) {
    console.error("Error:", error);

    // Determine the appropriate status code based on the error
    const statusCode =
      error.message === "Mood type is required" ||
      error.message === "Welcome mood not found"
        ? 400
        : 500;

    return res.status(statusCode).json({ message: error.message });
  }
}

// Function to find the latest welcome mood for a user
async function findLatestWelcomeMood(userId) {
  try {
    // Get the latest welcome mood for the user
    const latestMood = await client.db.Chooses.filter({ user_id: userId })
      .select(["welcome_mood_id", "datetime"])
      .sort("datetime", "desc")
      .getFirst();

    return latestMood;
  } catch (error) {
    console.error("Error finding latest welcome mood:", error);
    throw error;
  }
}

// GET LATEST WELCOME MOOD
async function getLatestWelcomeMood(req, res) {
  const { user_id } = req.params;

  try {
    // Call the function to find the latest welcome mood
    const latestMood = await findLatestWelcomeMood(user_id);

    return res.json(latestMood);
  } catch (error) {
    console.error("Error retrieving latest welcome mood:", error);
    return res
      .status(500)
      .json({ message: "Error retrieving latest welcome mood", error });
  }
}

export {
  calculateAndSubmitWelcomeMood,
  submitWelcomeMood,
  getWelcomeMoods,
  findLatestWelcomeMood,
  getLatestWelcomeMood,
  getLatestWeekWelcomeMoods,
};
