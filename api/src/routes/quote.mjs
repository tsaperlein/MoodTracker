// ROUTES - Quote

import express from "express";
import { getQuoteByLevel } from "../controllers/quote.mjs";

const router = express.Router();

// User routes
router.get("/quotes/level/:level", getQuoteByLevel);

export default router;
