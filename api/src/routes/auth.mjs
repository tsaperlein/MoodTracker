// ROUTES - Authentication

import express from "express";
import {
  signUp,
  signIn,
  requestPasswordReset,
  resetPassword,
} from "../controllers/auth.mjs";

const router = express.Router();

// Auth routes
router.post("/auth/signup", signUp);
router.post("/auth/signin", signIn);
router.post("/auth/requestPasswordReset", requestPasswordReset);
router.post("/auth/resetPassword", resetPassword);

export default router;
