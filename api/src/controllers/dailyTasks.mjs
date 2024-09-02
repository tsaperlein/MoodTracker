import dotenv from "dotenv";
dotenv.config();

import { getXataClient } from "../xata.mjs";
const client = getXataClient();

// Packages
import schedule from "node-schedule";

// Functions
import { createSurveyVersion, checkSurveyReadiness } from "./survey/survey.mjs";
import { sendNotificationToUser } from "./notification.mjs";
import {
  findLatestWelcomeMood,
  calculateAndSubmitWelcomeMood,
} from "./welcomeMood.mjs";
import {
  adjustToGreeceTime,
  areDatesOnDifferentDays,
} from "../utils/datetime.mjs";

async function createSurveyForUserAtRandomTime(userId) {
  const randomHour = Math.floor(Math.random() * (20 - 10) + 10);
  const randomMinute = Math.floor(Math.random() * 60);

  console.log(
    `Scheduling survey creation for user ${userId} at ${randomHour}:${randomMinute}`
  );

  schedule.scheduleJob({ hour: 0, minute: 1 }, async () => {
    try {
      const result = await createSurveyVersion(userId);
      if (result.success) {
        // Notify the user that a new survey is available
        await sendNotificationToUser({
          params: { user_id: userId },
          body: {
            title: "New Daily Survey Available",
            body: "Your new daily survey is ready. Please take a moment to complete it.",
          },
        });
        console.log(
          `Notification sent to user ${userId} about the new survey.`
        );
      } else {
        console.error(
          `Failed to create survey for user ${userId}: ${result.error}`
        );
      }
    } catch (error) {
      console.error(`Error during survey creation for user ${userId}:`, error);
    }
  });
}

async function checkAndScheduleSurveys() {
  const users = await client.db.User.getAll();

  for (const user of users) {
    try {
      const isReady = await checkSurveyReadiness(user.id);

      if (isReady.isReady) {
        await createSurveyForUserAtRandomTime(user.id);
      } else {
        console.log(
          `User ${user.id} is not ready for a new survey: ${isReady.message}`
        );
      }
    } catch (error) {
      console.error(
        `Error checking survey readiness for user ${user.id}:`,
        error
      );
    }
  }
}

// Function to check and assign "nothing" mood if not chosen by end of day
async function assignDefaultWelcomeMood() {
  const users = await client.db.User.getAll(); // Get all users

  for (const user of users) {
    try {
      // Get the latest welcome mood for the user
      const latestMood = await findLatestWelcomeMood(user.id);

      // Adjust the current time to Greece time zone
      const currentTime = adjustToGreeceTime(new Date());

      // Check if the latest mood was submitted today
      if (
        !latestMood ||
        areDatesOnDifferentDays(latestMood.datetime, currentTime)
      ) {
        // Submit "nothing" mood if no mood was selected today
        await calculateAndSubmitWelcomeMood(user.id, "nothing");
        console.log(`Assigned "nothing" mood to user ${user.id} for today.`);
      } else {
        console.log(`User ${user.id} has already chosen a mood for today.`);
      }
    } catch (error) {
      console.error(
        `Error assigning default welcome mood for user ${user.id}:`,
        error
      );
    }
  }
}

// Schedule job to run every day to check survey readiness and schedule surveys
function scheduleCreateDailySurvey() {
  // This will run at a fixed time every day, e.g., 8:00 AM
  schedule.scheduleJob({ hour: 2, minute: 47 }, async () => {
    console.log("Running daily survey scheduling task.");
    await checkAndScheduleSurveys();
  });
}

// Schedule job to run every day at 23:59 PM to assign default welcome moods
function scheduleAssignDefaultWelcomeMood() {
  schedule.scheduleJob({ hour: 23, minute: 59 }, async () => {
    console.log("Running daily default welcome mood assignment task.");
    await assignDefaultWelcomeMood();
  });
}

export { scheduleCreateDailySurvey, scheduleAssignDefaultWelcomeMood };
