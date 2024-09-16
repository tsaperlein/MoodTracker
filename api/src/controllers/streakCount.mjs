// CONTROLLERS - Streak

import dotenv from "dotenv";
dotenv.config();

import { fetchStreakCount } from "../services/streakCount.mjs";

// Controller to get streak count for a user
export async function getStreakCount(req, res) {
  const { user_id } = req.params;

  try {
    const totalStreak = await fetchStreakCount(user_id);

    if (totalStreak == null) {
      return res.status(404).json({ message: "No streak data found." });
    }

    res.status(200).json({ totalStreak });
  } catch (error) {
    res.status(500).json({ error: "Failed to calculate streaks" });
  }
}
