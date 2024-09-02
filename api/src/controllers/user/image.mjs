// CONTROLLER - User: Image

import dotenv from "dotenv";
dotenv.config();

import { getXataClient } from "../../xata.mjs";
const client = getXataClient();

async function getUserImage(req, res) {
  const { user_id } = req.params;

  try {
    console.log("Fetching user image from the database...");
    const userImage = await client.db.User.filter({ id: user_id })
      .select(["image"])
      .getFirst();

    if (!userImage || !userImage.image) {
      return res
        .status(404)
        .json({ success: false, message: "User Image not found" });
    }

    // Return the image URL in the response
    return res.json({ success: true, imageUrl: userImage.image.url });
  } catch (error) {
    console.error("Error retrieving user image:", error.message);
    return res.status(500).json({
      success: false,
      message: "Error retrieving user image",
      error: error.message,
    });
  }
}

async function updateUserImage(req, res) {
  const { user_id } = req.params;
  const { base64Image } = req.body;

  try {
    // Update the user record with the image
    const record = await client.db.User.update(
      user_id,
      {
        image: {
          name: `user-image-${user_id}.png`, // Customize naming as needed
          mediaType: "image/png",
          base64Content: base64Image,
          enablePublicUrl: true,
        },
      },
      ["image.url"]
    );

    // Check if the record was updated and contains a valid image URL
    if (!record || !record.image || !record.image.url) {
      console.error("Failed to obtain image URL");
      return res
        .status(500)
        .json({ success: false, message: "Failed to obtain image URL" });
    }

    // Return the successful response with the image URL
    return res.json({ success: true, imageUrl: record.image.url });
  } catch (error) {
    console.error("Error updating user image:", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Failed to update user image" });
  }
}

async function deleteUserImage(req, res) {
  const { user_id } = req.params;

  try {
    // Logic to delete the user image
    await client.db.User.update(user_id, {
      image: null,
    });

    return res.json({
      success: true,
      message: "User image deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting user image:", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to delete user image" });
  }
}

export { getUserImage, updateUserImage, deleteUserImage };
