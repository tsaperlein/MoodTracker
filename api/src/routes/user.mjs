// ROUTES - User

import express from "express";

const router = express.Router();

// User Functions
import {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/user.mjs";

// User Routes
router.get("/users", getAllUsers);
router.get("/users/:user_id", getUser);
router.put("/users/:user_id", updateUser);
router.delete("/users/:user_id", deleteUser);

export default router;
