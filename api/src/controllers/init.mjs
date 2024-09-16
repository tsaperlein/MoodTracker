// CONTROLLERS - Initialization

import dotenv from "dotenv";
dotenv.config();

import { initializeDatabase, clearDatabase } from "../services/init.mjs";

// Controller to initialize the database
export async function initDB(req, res) {
  try {
    await initializeDatabase();
    return res.status(200).json({
      message:
        "Database initialized with welcome moods, questions, quotes, chooses data, and surveys with answers for the specified user",
    });
  } catch (error) {
    console.error("Error:", error.message);
    return res.status(500).json({
      message: "Error initializing the database",
      error: error.message,
    });
  }
}

// Controller to empty the database
export async function emptyDB(req, res) {
  try {
    await clearDatabase();
    return res.status(200).json({ message: "Database emptied" });
  } catch (error) {
    console.error("Error:", error.message);
    return res
      .status(500)
      .json({ message: "Error emptying the database", error: error.message });
  }
}
