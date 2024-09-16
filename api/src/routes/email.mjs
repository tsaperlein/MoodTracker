// ROUTES - Email

import express from "express";

const router = express.Router();

// Email Functions
import { checkIfEmailExists } from "../controllers/email.mjs";

// Email Routes
router.get("/users/email/:email", checkIfEmailExists);

export default router;
