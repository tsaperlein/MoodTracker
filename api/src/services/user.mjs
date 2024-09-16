// SERVICES - User

import dotenv from "dotenv";
dotenv.config();

import { getXataClient } from "../xata.mjs";
const client = getXataClient();

// Service function to fetch all users
export async function fetchAllUsers() {
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

    return users;
  } catch (error) {
    console.error("Error retrieving users:", error);
    throw new Error("Error retrieving users");
  }
}

// Service function to fetch a user by ID
export async function fetchUserById(user_id) {
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
      .getFirst();

    return user;
  } catch (error) {
    console.error("Error retrieving user:", error);
    throw new Error("Error retrieving user");
  }
}

// Service function to update a user by ID
export async function updateUserById(
  user_id,
  { first_name, last_name, email }
) {
  try {
    const updatedUser = await client.db.User.update(user_id, {
      first_name,
      last_name,
      email,
    });

    return updatedUser;
  } catch (error) {
    console.error("Error updating user:", error);
    throw new Error("Error updating user");
  }
}

// Service function to delete a user by ID
export async function removeUserById(user_id) {
  try {
    await client.db.User.delete(user_id);
  } catch (error) {
    console.error("Error deleting user:", error);
    throw new Error("Error deleting user");
  }
}
