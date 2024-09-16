// CONTROLLERS - Authentication

import dotenv from "dotenv";
dotenv.config();

import {
  registerUser,
  authenticateUser,
  initiatePasswordReset,
  resetUserPassword,
} from "../services/auth.mjs";

// SIGN UP
export async function signUp(req, res) {
  const { first_name, last_name, email, password, pushNotificationToken } =
    req.body;

  try {
    const result = await registerUser(
      first_name,
      last_name,
      email,
      password,
      pushNotificationToken
    );
    return res.json(result);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Error creating user", error });
  }
}

// SIGN IN
export async function signIn(req, res) {
  const { email, password } = req.body;

  try {
    const result = await authenticateUser(email, password);
    return res.json(result);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Error signing in", error });
  }
}

// REQUEST PASSWORD RESET
export async function requestPasswordReset(req, res) {
  const { email } = req.body;

  try {
    const result = await initiatePasswordReset(email);
    return res.json(result);
  } catch (error) {
    console.error("Error during password reset request:", error);
    return res
      .status(500)
      .json({ message: "Error during password reset request", error });
  }
}

// RESET PASSWORD
export async function resetPassword(req, res) {
  const { token, newPassword } = req.body;

  try {
    const result = await resetUserPassword(token, newPassword);
    return res.json(result);
  } catch (error) {
    console.error("Error during password reset:", error);
    return res
      .status(500)
      .json({ message: "Error during password reset", error });
  }
}
