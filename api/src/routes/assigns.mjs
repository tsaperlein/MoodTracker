// ROUTES - Quote

import express from "express";
import { getQuoteByLevel } from "../controllers/message.mjs";

const router = express.Router();

// User routes
router.post("/quotes/assign", authenticateToken, assignQuoteToUser);

export default router;
