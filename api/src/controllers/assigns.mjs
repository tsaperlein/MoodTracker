// CONTROLLER - Assigns

import dotenv from "dotenv";
dotenv.config();

import { getXataClient } from "../xata.mjs";
const client = getXataClient();

// ASSIGN QUOTE TO USER
async function assignQuoteToUser(req, res) {
  const { user_id, quote_id } = req.body;

  try {
    const newAssign = await client.db.Assigns.create({
      user_id,
      quote_id,
      datetime: new Date(),
    });

    return res.status(201).json(newAssign);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Error assigning quote", error });
  }
}

export { assignQuoteToUser };
