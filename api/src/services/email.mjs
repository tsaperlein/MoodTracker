// SERVICE - Email

import dotenv from "dotenv";
dotenv.config();

import { getXataClient } from "../xata.mjs";
const client = getXataClient();

export async function checkEmailInDatabase(email) {
  try {
    const user = await client.db.User.filter({ email }).getFirst();

    return !!user;
  } catch (error) {
    console.error("Error checking if email exists:", error.message);
    throw new Error("Internal server error");
  }
}
