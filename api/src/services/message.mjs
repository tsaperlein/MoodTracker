// SERVICES - Message

import dotenv from "dotenv";
dotenv.config();

import { getXataClient } from "../xata.mjs";
const client = getXataClient();

// Service function to fetch and return a random message by level
export async function fetchRandomMessageByLevel(level) {
  try {
    // Fetch messages by level from the database
    const messages = await client.db.Message.filter({ level }).getAll();

    if (messages.length === 0) {
      return null;
    }

    // Shuffle messages and select a random one
    const randomMessage = messages.sort(() => 0.5 - Math.random())[0];

    // Prepare the response object
    return {
      author: randomMessage.author,
      text: randomMessage.text,
      level: randomMessage.level,
      type: randomMessage.type,
    };
  } catch (error) {
    console.error("Error fetching messages by level:", error.message);
    throw new Error("Error retrieving messages");
  }
}
