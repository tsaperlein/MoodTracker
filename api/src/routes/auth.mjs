// ROUTES - Authentication

import express from "express";
import { signUp, signIn } from "../controllers/auth.mjs"; // Adjust the path as necessary

const router = express.Router();

// Auth routes
router.post("/auth/signup", signUp);
router.post("/auth/signin", signIn);

export default router;
