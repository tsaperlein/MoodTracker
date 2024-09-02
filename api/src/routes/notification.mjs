// ROUTES - Notifications

import express from "express";
import { sendNotificationToUser } from "../controllers/notification.mjs";

const router = express.Router();

// User routes
router.post("/users/:user_id/send-notification", sendNotificationToUser);

export default router;
