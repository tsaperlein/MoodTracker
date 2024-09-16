// ROUTES - Authentication

import express from "express";

const router = express.Router();

// Auth Functions
import {
  signUp,
  signIn,
  requestPasswordReset,
  resetPassword,
} from "../controllers/auth.mjs";

// Auth Routes
router.post("/auth/signup", signUp);
router.post("/auth/signin", signIn);
router.post("/auth/requestPasswordReset", requestPasswordReset);
router.post("/auth/resetPassword", resetPassword);

export default router;
