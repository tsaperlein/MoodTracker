// CONTROLLERS - User

import dotenv from "dotenv";
dotenv.config();

import {
  fetchAllUsers,
  fetchUserById,
  updateUserById,
  removeUserById,
} from "../services/user.mjs";

// Controller to get all users
export async function getAllUsers(req, res) {
  try {
    const users = await fetchAllUsers();
    return res.json(users);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Error retrieving users", error });
  }
}

// Controller to get a user by ID
export async function getUser(req, res) {
  const { user_id } = req.params;

  try {
    const user = await fetchUserById(user_id);
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

// Controller to update a user
export async function updateUser(req, res) {
  const { user_id } = req.params;
  const { first_name, last_name, email } = req.body;

  try {
    const updatedUser = await updateUserById(user_id, {
      first_name,
      last_name,
      email,
    });
    if (!updatedUser) {
      return res
        .status(404)
        .json({ message: "User not found or update failed" });
    }
    return res.json({ success: true, user: updatedUser });
  } catch (error) {
    console.error("Error updating user information:", error);
    return res.status(500).json({
      success: false,
      message: "Error updating user information",
      error: error.message,
    });
  }
}

// Controller to delete a user
export async function deleteUser(req, res) {
  const { id } = req.params;

  try {
    await removeUserById(id);
    return res.status(204).send();
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Error deleting user", error });
  }
}
