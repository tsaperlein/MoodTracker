// CONTROLLERS - Mood Level

import dotenv from "dotenv";
dotenv.config();

import { fetchUserMoodLevel } from "../services/moodLevel.mjs";

// Controller function to find and return the user's mood level
export async function findUserMoodLevel(req, res) {
  const { user_id } = req.params;

  try {
    // Call the service function to fetch the user's mood level
    const result = await fetchUserMoodLevel(user_id);

    if (result.success) {
      return res.json(result);
    } else {
      return res.status(404).json(result);
    }
  } catch (error) {
    console.error(
      "Error occurred while finding user mood level:",
      error.message
    );
    return res.status(500).json({
      success: false,
      message: "Error finding user mood level",
      error: error.message,
    });
  }
}
