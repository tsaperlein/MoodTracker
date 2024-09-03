// CONTROLLER - User

import dotenv from "dotenv";
dotenv.config();

import { getXataClient } from "../../xata.mjs";
const client = getXataClient();

// GET ALL USERS
async function getAllUsers(req, res) {
  try {
    const users = await client.db.User.select([
      "id",
      "first_name",
      "last_name",
      "email",
      "streak_count",
      "image",
      "pushNotificationToken",
    ]).getAll();

    return res.json(users);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Error retrieving users", error });
  }
}

// GET USER
async function getUser(req, res) {
  const { user_id } = req.params;

  try {
    const user = await client.db.User.select([
      "id",
      "first_name",
      "last_name",
      "email",
      "streak_count",
      "image",
    ])
      .filter({ id: user_id })
      .getFirst(); // Updated method

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.json(user);
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(500)
      .json({ message: "Error retrieving user information", error });
  }
}

// UPDATE USER INFO
async function updateUser(req, res) {
  const { user_id } = req.params;
  const { first_name, last_name, email } = req.body;

  try {
    // Assuming 'client.db.User.update' updates the user and returns the updated user object
    const updatedUser = await client.db.User.update(user_id, {
      first_name,
      last_name,
      email,
    });

    if (!updatedUser) {
      // If the user was not found or updated, return a 404 response
      return res
        .status(404)
        .json({ message: "User not found or update failed" });
    }

    // Respond with the updated user object
    return res.json({ success: true, user: updatedUser });
  } catch (error) {
    console.error("Error updating user information:", error);

    // Return a 500 response in case of server errors
    return res.status(500).json({
      success: false,
      message: "Error updating user information",
      error: error.message, // Providing the error message for debugging purposes
    });
  }
}

// DELETE USER
async function deleteUser(req, res) {
  const { id } = req.params;

  try {
    await client.db.User.delete(id);
    return res.status(204).send();
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Error deleting user", error });
  }
}

export { getAllUsers, getUser, updateUser, deleteUser };
