// CONTROLLER - User: Image

import dotenv from "dotenv";
dotenv.config();

import {
  fetchUserImage,
  updateUserImageInDb,
  removeUserImage,
} from "../services/image.mjs";

// Controller to fetch the user image
export async function getUserImage(req, res) {
  const { user_id } = req.params;

  try {
    // Call the service function to get the user image
    const result = await fetchUserImage(user_id);

    if (result.success) {
      return res.json(result);
    } else {
      return res.status(404).json(result);
    }
  } catch (error) {
    console.error("Error retrieving user image:", error.message);
    return res.status(500).json({
      success: false,
      message: "Error retrieving user image",
      error: error.message,
    });
  }
}

// Controller to update the user image
export async function updateUserImage(req, res) {
  const { user_id } = req.params;
  const { base64Image } = req.body;

  try {
    // Call the service function to update the user image
    const result = await updateUserImageInDb(user_id, base64Image);

    if (result.success) {
      return res.json(result);
    } else {
      return res.status(500).json(result);
    }
  } catch (error) {
    console.error("Error updating user image:", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Failed to update user image" });
  }
}

// Controller to delete the user image
export async function deleteUserImage(req, res) {
  const { user_id } = req.params;

  try {
    // Call the service function to delete the user image
    const result = await removeUserImage(user_id);

    return res.json(result);
  } catch (error) {
    console.error("Error deleting user image:", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to delete user image" });
  }
}
