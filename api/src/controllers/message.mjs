// CONTROLLER - Message

import dotenv from "dotenv";
dotenv.config();

import { getXataClient } from "../xata.mjs";
const client = getXataClient();

// GET RANDOM MESSAGE BY LEVEL
async function getMessageByLevel(req, res) {
  const { level } = req.params;

  try {
    // Fetch messages by level
    const messages = await client.db.Message.filter({ level }).getMany();

    if (messages.length === 0) {
      return res
        .status(404)
        .json({ message: "No messages found for this level" });
    }

    // Shuffle messages and select a random one
    const randomMessage = messages.sort(() => 0.5 - Math.random())[0];

    // Prepare the response object
    const responseMessage = {
      author: randomMessage.author,
      text: randomMessage.text,
      level: randomMessage.level,
      type: randomMessage.type,
    };

    return res.json(responseMessage);
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(500)
      .json({ message: "Error retrieving messages", error });
  }
}

export { getMessageByLevel };
