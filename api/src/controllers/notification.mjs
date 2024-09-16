// CONTROLLERS - Notification

import dotenv from "dotenv";
dotenv.config();

import {
  sendUserNotification,
  scheduleDailyReminderNotifications,
} from "../services/notification.mjs";

// Controller to send notification to a user
export async function sendNotificationToUser(req, res) {
  const { user_id } = req.params;
  const { title, body } = req.body;

  try {
    // Call the service function to send the notification
    const result = await sendUserNotification(user_id, title, body);

    if (result.success) {
      return res.status(200).send(result);
    } else {
      return res.status(500).send(result);
    }
  } catch (error) {
    console.error("Error in sendNotificationToUser:", error.message);
    return res.status(500).send({ success: false, error: error.message });
  }
}

// Controller to schedule reminder notifications
export function scheduleReminderNotifications() {
  scheduleDailyReminderNotifications();
}
