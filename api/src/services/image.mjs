// SERVICES - User: Image

import dotenv from "dotenv";
dotenv.config();

import { getXataClient } from "../xata.mjs";
const client = getXataClient();

// Fetch the user image from the database
export async function fetchUserImage(user_id) {
  try {
    const userImage = await client.db.User.filter({ id: user_id })
      .select(["image"])
      .getFirst();

    if (!userImage || !userImage.image) {
      return {
        success: false,
        message: "User Image not found",
      };
    }

    return {
      success: true,
      imageUrl: userImage.image.url,
    };
  } catch (error) {
    console.error("Error retrieving user image:", error.message);
    throw new Error("Error retrieving user image");
  }
}

// Update the user image in the database
export async function updateUserImageInDb(user_id, base64Image) {
  try {
    const record = await client.db.User.update(
      user_id,
      {
        image: {
          name: `user-image-${user_id}.png`,
          mediaType: "image/png",
          base64Content: base64Image,
          enablePublicUrl: true,
        },
      },
      ["image.url"]
    );

    if (!record || !record.image || !record.image.url) {
      console.error("Failed to obtain image URL");
      return {
        success: false,
        message: "Failed to obtain image URL",
      };
    }

    return {
      success: true,
      imageUrl: record.image.url,
    };
  } catch (error) {
    console.error("Error updating user image:", error.message);
    throw new Error("Error updating user image");
  }
}

// Remove the user image from the database
export async function removeUserImage(user_id) {
  try {
    await client.db.User.update(user_id, {
      image: null,
    });

    return {
      success: true,
      message: "User image deleted successfully",
    };
  } catch (error) {
    console.error("Error deleting user image:", error.message);
    throw new Error("Error deleting user image");
  }
}
