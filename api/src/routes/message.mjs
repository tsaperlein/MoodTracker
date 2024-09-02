// ROUTES - Message

import express from "express";
import { getMessageByLevel } from "../controllers/message.mjs";

const router = express.Router();

// User routes
router.get("/message/:level", getMessageByLevel);

export default router;
