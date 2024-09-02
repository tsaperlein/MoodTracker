import dotenv from "dotenv";
dotenv.config();

import { getXataClient } from "../xata.mjs";
const client = getXataClient();

// Packages
import schedule from "node-schedule";

// Expo
import { Expo } from "expo-server-sdk";

import { isSurveyVersionFinished } from "./survey/answer.mjs";
import { findLatestWelcomeMood } from "./welcomeMood.mjs";
import { adjustToGreeceTime } from "../utils/datetime.mjs";

const sendNotificationToUser = async (req, res = null) => {
  const { user_id } = req.params;
  const {
    title = "Important Update",
    body = "This is a notification for you!",
  } = req.body;

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

    if (res) {
      res.status(200).send({ success: true, tickets });
    } else {
      console.log("Notification sent successfully:", tickets);
    }
  } catch (error) {
    console.error("Error in sendNotificationToUser:", error);
    if (res) {
      res.status(500).send({ success: false, error: error.message });
    } else {
      console.error("Error occurred during scheduled job:", error.message);
    }
  }
};

// Schedule combined job to send survey reminders and welcome mood notifications to all users
function scheduleReminderNotifications() {
  schedule.scheduleJob({ hour: 21, minute: 0 }, async () => {
    const users = await client.db.User.getAll();
    const today = adjustToGreeceTime(new Date()).toDateString(); // Get today's date string for comparison

    for (const user of users) {
      try {
        // Initialize flags
        let needsSurveyReminder = false;
        let needsMoodReminder = false;

        // Check if the survey is completed
        const latestSurvey = await client.db.Survey.filter({
          user_id: user.id,
        }).getFirst();

        if (latestSurvey) {
          const isFinished = await isSurveyVersionFinished(latestSurvey.id);

          if (!isFinished) {
            needsSurveyReminder = true;
          } else {
            console.log(
              `User ${user.id} has already completed the survey. No reminder needed.`
            );
          }
        } else {
          console.log(`No survey found for user ${user.id}. No reminder sent.`);
        }

        // Check if the user has chosen their welcome mood today
        const latestMood = await findLatestWelcomeMood(user.id);

        if (
          !latestMood ||
          new Date(latestMood.datetime).toDateString() !== today
        ) {
          needsMoodReminder = true;
        } else {
          console.log(
            `User ${user.id} has already chosen their welcome mood today.`
          );
        }

        // Send a combined notification if both reminders are needed
        if (needsSurveyReminder && needsMoodReminder) {
          await sendNotificationToUser({
            params: { user_id: user.id },
            body: {
              title: "Daily Reminders",
              body: "Don't forget to complete your daily survey and reflect on your mood!",
            },
          });
        } else if (needsSurveyReminder) {
          await sendNotificationToUser({
            params: { user_id: user.id },
            body: {
              title: "Survey Reminder",
              body: "Don't forget to complete your daily survey!",
            },
          });
        } else if (needsMoodReminder) {
          await sendNotificationToUser({
            params: { user_id: user.id },
            body: {
              title: "Welcome Mood Check",
              body: "How are you feeling today? Take a moment to reflect on your mood.",
            },
          });
        }
      } catch (error) {
        console.error(`Error processing user ${user.id}:`, error);
      }
    }
  });
}

export { sendNotificationToUser, scheduleReminderNotifications };
