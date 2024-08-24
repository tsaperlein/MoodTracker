// CONTROLLER - Welcome Mood

import dotenv from "dotenv";
dotenv.config();

import { getXataClient } from "../xata.mjs";
const client = getXataClient();

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

    // Sort the moods by datetime in descending order (latest first)
    const sortedMoods = welcomeMoods.sort(
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

// SUBMIT WELCOME MOOD
async function submitWelcomeMood(req, res) {
  const { user_id } = req.params;
  const { mood_type } = req.body;

  try {
    // Find the welcome mood by its type
    const welcomeMood = await client.db.WelcomeMood.filter({
      type: mood_type,
    }).getFirst();

    if (!welcomeMood) {
      return res.status(404).json({ message: "Welcome mood not found" });
    }

    // Create the new choice
    const newChoice = await client.db.Chooses.create({
      user_id,
      welcome_mood_id: welcomeMood.id,
      datetime: new Date(),
    });

    return res.status(201).json(newChoice);
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(500)
      .json({ message: "Error submitting welcome mood", error });
  }
}

// GET LATEST WELCOME MOOD
async function getLatestWelcomeMood(req, res) {
  const { user_id } = req.params;

  try {
    // Get the latest welcome mood for the user
    const latestMood = await client.db.Chooses.filter({ user_id })
      .select(["welcome_mood_id", "datetime"])
      .sort("datetime", "desc")
      .getFirst();

    return res.json(latestMood);
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(500)
      .json({ message: "Error retrieving latest welcome mood", error });
  }
}

export {
  submitWelcomeMood,
  getWelcomeMoods,
  getLatestWelcomeMood,
  getLatestWeekWelcomeMoods,
};
