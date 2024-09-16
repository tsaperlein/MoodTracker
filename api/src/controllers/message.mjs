// CONTROLLERS - Message

import dotenv from "dotenv";
dotenv.config();

import { fetchRandomMessageByLevel } from "../services/message.mjs";

// Controller to get a random message by level
export async function getMessageByLevel(req, res) {
  const { level } = req.params;

  try {
    // Call the service function to fetch a random message by level
    const responseMessage = await fetchRandomMessageByLevel(level);

    if (responseMessage) {
      return res.json(responseMessage);
    } else {
      return res
        .status(404)
        .json({ message: "No messages found for this level" });
    }
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(500)
      .json({ message: "Error retrieving messages", error });
  }
}
