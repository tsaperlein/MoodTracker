// CONTROLLERS - Email

import dotenv from "dotenv";
dotenv.config();

import { checkEmailInDatabase } from "../services/email.mjs";

export async function checkIfEmailExists(req, res) {
  const { email } = req.params;

  try {
    const exists = await checkEmailInDatabase(email);

    return res.json({ exists });
  } catch (error) {
    console.error("Error checking if email exists:", error.message);
    return res.status(500).json({
      message: "Error checking if email exists",
      error: error.message,
    });
  }
}
