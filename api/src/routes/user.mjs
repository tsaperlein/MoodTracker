// ROUTES - User

import express from "express";
import {
  getAllUsers,
  getUser,
  getUserImage,
  updateUser,
  updateUserImage,
  updateUserStreakCount,
  deleteUser,
  deleteUserImage,
  checkIfEmailExists,
} from "../controllers/user.mjs";

const router = express.Router();

// User routes
router.get("/users", getAllUsers);
router.get("/users/:user_id", getUser);
router.get("/users/:user_id/image", getUserImage);
router.put("/users/:user_id", updateUser);
router.post("/users/:user_id/update-image", updateUserImage);
router.post("/users/:user_id/update-streak-count", updateUserStreakCount);
router.delete("/users/:user_id", deleteUser);
router.delete("/users/:user_id/delete-image", deleteUserImage);
router.get("/users/email/:email", checkIfEmailExists);

export default router;
