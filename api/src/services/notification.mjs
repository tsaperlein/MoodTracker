// SERVICES - Notification

import dotenv from "dotenv";
dotenv.config();

import { getXataClient } from "../xata.mjs";
const client = getXataClient();

// Packages
import schedule from "node-schedule";
import { Expo } from "expo-server-sdk";

import { checkSurveyCompletionStatus } from "./answer.mjs";
import { fetchLatestWelcomeMood } from "./welcomeMood.mjs";

// Utilities
import { adjustToGreeceTime } from "../utils/datetime.mjs";

// Service function to send notification to a user
export async function sendUserNotification(
  user_id,
  title = "Important Update",
  body = "This is a notification for you!"
) {
  try {
    const user = await client.db.User.select(["pushNotificationToken"])
      .filter({ id: user_id })
      .getFirst();

    const token = user.pushNotificationToken;

    if (!token) {
      throw new Error("User does not have a valid token for notifications.");
    }

    const message = {
      to: token,
      sound: "default",
      title,
      body,
    };

    const expo = new Expo();
    const ticketChunk = await expo.sendPushNotificationsAsync([message]);
    const tickets = [...ticketChunk];

    return { success: true, tickets };
  } catch (error) {
    console.error("Error in sendUserNotification:", error.message);
    return { success: false, error: error.message };
  }
}

// Service function to schedule reminder notifications for all users
export function scheduleDailyReminderNotifications() {
  // Schedule the reminder job to run every day at a specific time (e.g., 18:00)
  schedule.scheduleJob({ hour: 18, minute: 0 }, async () => {
    try {
      const users = await client.db.User.getAll();
      const today = adjustToGreeceTime(new Date()).toDateString();

      for (const user of users) {
        let needsSurveyReminder = false;
        let needsMoodReminder = false;

        // Check if the survey is completed
        const latestSurvey = await client.db.Survey.filter({
          user_id: user.id,
        }).getFirst();

        if (latestSurvey) {
          const isFinished = await checkSurveyCompletionStatus(latestSurvey.id);
          if (!isFinished) needsSurveyReminder = true;
        }

        // Check if the user has chosen their welcome mood today
        const latestMood = await fetchLatestWelcomeMood(user.id);
        if (
          !latestMood ||
          new Date(latestMood.datetime).toDateString() !== today
        ) {
          needsMoodReminder = true;
        }

        // Send notifications based on the user's reminders
        if (needsSurveyReminder && needsMoodReminder) {
          await sendUserNotification(
            user.id,
            "Daily Reminders",
            "Don't forget to complete your daily survey and reflect on your mood!"
          );
        } else if (needsSurveyReminder) {
          await sendUserNotification(
            user.id,
            "Survey Reminder",
            "Don't forget to complete your daily survey!"
          );
        } else if (needsMoodReminder) {
          await sendUserNotification(
            user.id,
            "Welcome Mood Reminder",
            "How are you feeling today? Take a moment to reflect on your mood."
          );
        }
      }
    } catch (error) {
      console.error(
        "Error in scheduleDailyReminderNotifications:",
        error.message
      );
    }
  });
}
