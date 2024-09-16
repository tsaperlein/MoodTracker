// SERVICE - Authentication

import dotenv from "dotenv";
dotenv.config();

import { getXataClient } from "../xata.mjs";
const client = getXataClient();

// Packages
import bcrypt from "bcryptjs";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

// Utilities
import { hashData, compareHash } from "../utils/hash.mjs";
import { adjustToGreeceTime } from "../utils/datetime.mjs";

import { createSurveyVersion } from "./survey.mjs";

// REGISTER (Sign Up)
export async function registerUser(
  first_name,
  last_name,
  email,
  password,
  pushNotificationToken
) {
  try {
    const existingUser = await client.db.User.filter({ email }).getFirst();
    if (existingUser) {
      return { message: "Email is already registered" };
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

    // Create JWT for authentication
    const authToken = jwt.sign(
      { id: newUser.id, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "14d" }
    );

    return {
      id: newUser.id,
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      email: newUser.email,
      streak_count: newUser.streak_count,
      image: newUser.image,
      pushNotificationToken,
      authToken,
    };
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Error creating user");
  }
}

// AUTHENTICATE (Sign In)
export async function authenticateUser(email, password) {
  try {
    const user = await client.db.User.filter({ email }).getFirst();

    if (!user || !compareHash(password, user.password)) {
      throw new Error("Invalid email or password");
    }

    // Create JWT for authentication
    const authToken = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "14d" }
    );

    return {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      streak_count: user.streak_count,
      image: user.image,
      pushNotificationToken: user.pushNotificationToken,
      authToken,
    };
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Error signing in");
  }
}

// INITIATE PASSWORD RESET
export async function initiatePasswordReset(email) {
  try {
    const user = await client.db.User.filter({ email }).getFirst();
    if (!user) {
      return { message: "User not found" };
    }

    // Generate a password reset token
    const passwordResetToken = crypto.randomBytes(32).toString("hex");

    // Calculate the expiration time (1 hour from now)
    const resetTokenExpiration = new Date(
      adjustToGreeceTime(Date.now()) + 3600000
    ).toISOString();

    // Update the user with reset token and expiration
    await client.db.User.update(user.id, {
      passwordResetToken,
      resetTokenExpiration,
    });

    // Send password reset email
    await sendPasswordResetEmail(user.email, passwordResetToken);

    return { message: "Password reset email sent" };
  } catch (error) {
    console.error("Error during password reset request:", error);
    throw new Error("Error during password reset request");
  }
}

// RESET PASSWORD
export async function resetUserPassword(token, newPassword) {
  try {
    const user = await client.db.User.filter({
      passwordResetToken: token,
    }).getFirst();
    if (!user || !user.resetTokenExpiration) {
      return { message: "Invalid or expired token" };
    }

    // Check if the token has expired
    if (new Date(user.resetTokenExpiration) <= adjustToGreeceTime(new Date())) {
      return { message: "Invalid or expired token" };
    }

    // Hash the new password
    const hashedPassword = bcrypt.hashSync(newPassword, 10);

    // Update the user's password and clear the reset token and expiration
    await client.db.User.update(user.id, {
      password: hashedPassword,
      passwordResetToken: null,
      resetTokenExpiration: null,
    });

    return { message: "Password has been reset successfully" };
  } catch (error) {
    console.error("Error during password reset:", error);
    throw new Error("Error during password reset");
  }
}

// Send Password Reset Email
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
