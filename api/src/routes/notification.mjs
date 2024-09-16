// ROUTES - Notification

import express from "express";

const router = express.Router();

// Notification Functions
import { sendNotificationToUser } from "../controllers/notification.mjs";

// Notification Routes
router.post("/users/:user_id/send-notification", sendNotificationToUser);

export default router;
