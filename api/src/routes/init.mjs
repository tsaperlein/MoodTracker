// ROUTES - Initialization

import express from "express";

const router = express.Router();

// Initialization Functions
import { initDB, emptyDB } from "../controllers/init.mjs";

// Initialization Routes
router.get("/init", initDB);
router.get("/empty", emptyDB);

export default router;
