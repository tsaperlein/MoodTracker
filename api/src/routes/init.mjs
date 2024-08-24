// ROUTES - Initialization

import express from "express";
import { initDB, emptyDB } from "../controllers/init.mjs";

const router = express.Router();

// User routes
router.get("/init", initDB);
router.get("/empty", emptyDB);

export default router;
