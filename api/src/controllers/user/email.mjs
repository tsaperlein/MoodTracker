// CONTROLLER - User: Email

import dotenv from "dotenv";
dotenv.config();

import { getXataClient } from "../../xata.mjs";
const client = getXataClient();

async function checkIfEmailExists(req, res) {
  const { email } = req.params;

  try {
    const user = await client.db.User.filter({ email }).getFirst();

    if (user) {
      return res.json({ exists: true });
    } else {
      return res.json({ exists: false });
    }
  } catch (error) {
    console.error("Error checking if email exists:", error);
    return res
      .status(500)
      .json({ message: "Error checking if email exists", error });
  }
}

export { checkIfEmailExists };
