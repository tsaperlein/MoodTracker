// ROUTES - Image

import express from "express";

const router = express.Router();

// Image Functions
import {
  getUserImage,
  updateUserImage,
  deleteUserImage,
} from "../controllers/image.mjs";

// Image Routes
router.get("/users/:user_id/image", getUserImage);
router.post("/users/:user_id/update-image", updateUserImage);
router.delete("/users/:user_id/delete-image", deleteUserImage);

export default router;
