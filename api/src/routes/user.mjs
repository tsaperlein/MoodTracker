// ROUTES - User

import express from "express";

const router = express.Router();

/* --- USER --- */
// User Functions
import {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/user/user.mjs";

// User Routes
router.get("/users", getAllUsers);
router.get("/users/:user_id", getUser);
router.put("/users/:user_id", updateUser);
router.delete("/users/:user_id", deleteUser);

/* --- IMAGE --- */
// Image Functions
import {
  getUserImage,
  updateUserImage,
  deleteUserImage,
} from "../controllers/user/image.mjs";

// Image Routes
router.get("/users/:user_id/image", getUserImage);
router.post("/users/:user_id/update-image", updateUserImage);
router.delete("/users/:user_id/delete-image", deleteUserImage);

/* --- STREAK COUNT --- */
// Streak Count Functions
import { getStreakCount } from "../controllers/user/streakCount.mjs";

// Streak Count Routes
router.get("/users/:user_id/get-streak-count", getStreakCount);

/* --- EMAIL --- */
// Email Functions
import { checkIfEmailExists } from "../controllers/user/email.mjs";

// Email Routes
router.get("/users/email/:email", checkIfEmailExists);

/* --- MOOD LEVEL --- */
// Mood Level Functions
import { findUserMoodLevel } from "../controllers/user/moodLevel.mjs";

// Mood Level Routes
router.get("/users/:user_id/find-mood-level", findUserMoodLevel);

export default router;
