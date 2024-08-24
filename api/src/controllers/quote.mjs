// CONTROLLER - Quote

import dotenv from "dotenv";
dotenv.config();

import { getXataClient } from "../xata.mjs";
const client = getXataClient();

// GET RANDOM QUOTE BY LEVEL
async function getQuoteByLevel(req, res) {
  const { level } = req.params;

  try {
    // Fetch quotes by level
    const quotes = await client.db.Quote.filter({ level }).getMany();

    if (quotes.length === 0) {
      return res
        .status(404)
        .json({ message: "No quotes found for this level" });
    }

    // Shuffle quotes and select a random one
    const randomQuote = quotes.sort(() => 0.5 - Math.random())[0];

    return res.json(randomQuote);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Error retrieving quotes", error });
  }
}

// ASSIGN QUOTE TO USER

export { getQuoteByLevel };
