// ROUTES - Message

import express from "express";

const router = express.Router();

// Message Functions
import { getMessageByLevel } from "../controllers/message.mjs";

// Message Routes
router.get("/message/:level", getMessageByLevel);

export default router;
