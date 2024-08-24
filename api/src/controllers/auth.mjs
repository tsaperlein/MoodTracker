// CONTROLLER - Authentication

import { hashData, compareHash } from "../utils/hash.mjs";

import dotenv from "dotenv";
dotenv.config();

import { getXataClient } from "../xata.mjs";
const client = getXataClient();

async function signUp(req, res) {
  const { first_name, last_name, email, password } = req.body;

  try {
    // Check if the email is already registered
    const existingUser = await client.db.User.filter({ email }).getFirst();
    if (existingUser) {
      return res.status(400).json({ message: "Email is already registered" });
    }

    // Hash the password
    const hashedPassword = hashData(password);

    // Create the new user
    const newUser = await client.db.User.create({
      first_name,
      last_name,
      email,
      password: hashedPassword,
      streak_count: 0,
    });

    // Remove sensitive data and keep only required fields
    const {
      id,
      first_name: firstName,
      last_name: lastName,
      email: userEmail,
      streak_count: streakCount,
      image,
    } = newUser;

    return res.json({
      id,
      first_name: firstName,
      last_name: lastName,
      email: userEmail,
      streak_count: streakCount,
      image,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Error creating user", error });
  }
}

// SIGN IN
async function signIn(req, res) {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await client.db.User.filter({ email }).getFirst();
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    if (!user || !compareHash(password, user.password)) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Remove sensitive data and keep only required fields
    const {
      id,
      first_name: firstName,
      last_name: lastName,
      email: userEmail,
      streak_count: streakCount,
      image,
    } = user;

    return res.json({
      id,
      first_name: firstName,
      last_name: lastName,
      email: userEmail,
      streak_count: streakCount,
      image,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Error signing in", error });
  }
}

export { signUp, signIn };
