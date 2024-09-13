// CONTROLLER - Authentication

import dotenv from "dotenv";
dotenv.config();

import { getXataClient } from "../xata.mjs";
const client = getXataClient();

import bcrypt from "bcryptjs";
import crypto from "crypto";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";

import { hashData, compareHash } from "../utils/hash.mjs";
import { adjustToGreeceTime } from "../utils/datetime.mjs";
import { createSurveyVersion } from "./survey/survey.mjs";

// SIGN UP
async function signUp(req, res) {
  const { first_name, last_name, email, password, pushNotificationToken } =
    req.body;

  try {
    const existingUser = await client.db.User.filter({ email }).getFirst();
    if (existingUser) {
      return res.status(400).json({ message: "Email is already registered" });
    }

    const hashedPassword = hashData(password);

    const newUser = await client.db.User.create({
      first_name,
      last_name,
      email,
      password: hashedPassword,
      streak_count: 0,
      pushNotificationToken,
    });

    // Create a new survey version for the newly registered user
    const surveyCreationResult = await createSurveyVersion(newUser.id);

    if (!surveyCreationResult.success) {
      console.error(
        `Survey creation failed for user ${newUser.id}:`,
        surveyCreationResult.error
      );
    }

    // Create a JWT for authentication
    const authToken = jwt.sign(
      { id: newUser.id, email: newUser.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "14d",
      }
    );

    return res.json({
      id: newUser.id,
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      email: newUser.email,
      streak_count: newUser.streak_count,
      image: newUser.image,
      pushNotificationToken,
      authToken,
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
    const user = await client.db.User.filter({ email }).getFirst();
    if (!user || !compareHash(password, user.password)) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Create a JWT for authentication
    const authToken = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "14d",
      }
    );

    return res.json({
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      streak_count: user.streak_count,
      image: user.image,
      pushNotificationToken: user.pushNotificationToken,
      authToken,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Error signing in", error });
  }
}

async function requestPasswordReset(req, res) {
  const { email } = req.body;

  try {
    const user = await client.db.User.filter({ email }).getFirst();
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate a password reset token
    const passwordResetToken = crypto.randomBytes(32).toString("hex");

    // Calculate the expiration time and convert it to RFC 3339 format
    const resetTokenExpiration = new Date(
      adjustToGreeceTime(Date.now()) + 3600000
    ).toISOString();

    // Update user with reset token and expiration
    await client.db.User.update(user.id, {
      passwordResetToken,
      resetTokenExpiration,
    });

    // Send password reset email (implementation depends on your setup)
    sendPasswordResetEmail(user.email, passwordResetToken);

    return res.json({ message: "Password reset email sent" });
  } catch (error) {
    console.error("Error during password reset request:", error);
    return res
      .status(500)
      .json({ message: "Error during password reset request", error });
  }
}

async function resetPassword(req, res) {
  const { token, newPassword } = req.body;

  try {
    const user = await client.db.User.filter({
      passwordResetToken: token,
    }).getFirst();

    if (!user || !user.resetTokenExpiration) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    // Check if the token has expired
    if (new Date(user.resetTokenExpiration) <= adjustToGreeceTime(new Date())) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    // Hash the new password
    const hashedPassword = bcrypt.hashSync(newPassword, 10);

    // Update the user's password and clear the reset token and expiration
    await client.db.User.update(user.id, {
      password: hashedPassword,
      passwordResetToken: null,
      resetTokenExpiration: null,
    });

    return res.json({ message: "Password has been reset successfully" });
  } catch (error) {
    console.error("Error during password reset:", error);
    return res
      .status(500)
      .json({ message: "Error during password reset", error });
  }
}

async function sendPasswordResetEmail(email, token) {
  const resetLink = `${process.env.FRONTEND_URL}/reset-password/${token}`;

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Password Reset Request",
    text: `You requested a password reset. Click the link to reset your password: ${resetLink}`,
    html: `<p>You requested a password reset. Click the link below to reset your password:</p><a href="${resetLink}">${resetLink}</a>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Password reset email sent to ${email}`);
  } catch (error) {
    console.error("Error sending password reset email:", error);
    throw new Error("Error sending password reset email");
  }
}

export { signUp, signIn, requestPasswordReset, resetPassword };
