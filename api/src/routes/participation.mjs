// ROUTES - Participation

import express from "express";

const router = express.Router();

// Participation Functions
import { getUserParticipation } from "../controllers/participation.mjs";

// Participation Routes
router.get("/users/:user_id/get-participation", getUserParticipation);

export default router;
