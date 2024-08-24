// CONTROLLER - User

import dotenv from "dotenv";
dotenv.config();

import { getXataClient } from "../xata.mjs";
const client = getXataClient();

import {
  generateSignedUrl,
  validateSignedUrl,
} from "../utils/signedUrlUtils.mjs";

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
    ]).read(user_id);

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
    const updatedUser = await client.db.User.update(user_id, {
      first_name,
      last_name,
      email,
    });
    return res.json(updatedUser);
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(500)
      .json({ message: "Error updating user information", error });
  }
}

async function calculateStreak(dates) {
  if (dates.length === 0) return 0;

  // Sort dates in descending order
  dates.sort((a, b) => new Date(b) - new Date(a));

  let streak = 1;
  const today = new Date();
  const oneDayInMillis = 1000 * 60 * 60 * 24;

  // Check if the first date in the list (most recent) is today or yesterday
  const firstDate = new Date(dates[0]);
  const diffTimeFirst = Math.abs(today - firstDate);
  const diffDaysFirst = Math.floor(diffTimeFirst / oneDayInMillis);

  if (diffDaysFirst > 1) {
    return 0; // If the most recent activity is more than a day ago, streak is zero
  }

  for (let i = 1; i < dates.length; i++) {
    const currentDate = new Date(dates[i]);
    const previousDate = new Date(dates[i - 1]);

    // Calculate difference in days
    const diffTime = Math.abs(previousDate - currentDate);
    const diffDays = Math.ceil(diffTime / oneDayInMillis);

    if (diffDays === 1) {
      streak++;
    } else {
      break; // Stop counting if the days are not consecutive
    }
  }

  return streak;
}

async function updateUserStreakCount(req, res) {
  const { user_id } = req.params;

  try {
    const xata = getXataClient();

    // Fetch survey completion dates
    const surveys = await xata.db.Survey.filter({ user_id })
      .select(["completion_time"])
      .getAll();

    const surveyDates = surveys.map((s) => s.completion_time).filter(Boolean);

    // Fetch welcome mood selection dates and filter out 'nothing'
    const moods = await xata.db.Chooses.filter({ user_id })
      .select(["datetime", "welcome_mood_id.type"])
      .getAll();

    const moodDates = moods
      .filter((m) => m.welcome_mood_id?.type !== "nothing" && m.datetime) // Filter out 'nothing' mood type and null dates
      .map((m) => m.datetime)
      .filter(Boolean);

    // Calculate streaks for both
    const surveyStreak = await calculateStreak(surveyDates);
    const moodStreak = await calculateStreak(moodDates);
    console.log(moodStreak);

    // User streak is the minimum of both streaks
    const streak_count = Math.min(surveyStreak, moodStreak);

    // Update the user's streak count
    const updatedUser = await xata.db.User.update(user_id, {
      streak_count,
    });

    return res.json(updatedUser);
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(500)
      .json({ message: "Error updating user streak count", error });
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

export {
  getAllUsers,
  getUser,
  getUserImage,
  updateUser,
  updateUserImage,
  updateUserStreakCount,
  deleteUser,
  deleteUserImage,
  checkIfEmailExists,
};
