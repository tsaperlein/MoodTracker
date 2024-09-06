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
  // Random hour between 12:00 and 21:00
  const randomHour = Math.floor(Math.random() * (21 - 12) + 12);
  // Convert to greek time (minus 3 hours)
  const randomGreekHour = randomHour - 3;
  const randomMinute = Math.floor(Math.random() * 60);

  console.log(
    `Scheduling survey creation for user ${userId} at ${randomHour}:${randomMinute}`
  );

  schedule.scheduleJob(
    { hour: randomGreekHour, minute: randomMinute },
    async () => {
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
        console.error(
          `Error during survey creation for user ${userId}:`,
          error
        );
      }
    }
  );
}

async function checkAndScheduleSurveys() {
  const users = await client.db.User.getAll();

  for (const user of users) {
    try {
      const result = await checkSurveyReadiness(user.id);

      if (result.isReady) {
        await createSurveyForUserAtRandomTime(user.id);
      } else {
        console.log(
          `User ${user.id} is not ready for a new survey: ${result.message}`
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
  const users = await client.db.User.getAll();
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
  // This will run at a fixed time every day, e.g., 0:01 AM, but adjusted to 21:01 (24 - 3 hours) because of time difference
  schedule.scheduleJob({ hour: 21, minute: 1 }, async () => {
    const now = adjustToGreeceTime(new Date());
    console.log(
      `Running daily survey scheduling task at ${now.toISOString()}.`
    );
    await checkAndScheduleSurveys();
  });
}

// Schedule job to run every day at 23:59 PM to assign default welcome moods
function scheduleAssignDefaultWelcomeMood() {
  // Schedule job to run every day at 23:59 PM to assign default welcome moods, but adjusted to 20:59 (23 - 3 hours) because of time difference
  schedule.scheduleJob({ hour: 20, minute: 59 }, async () => {
    const now = adjustToGreeceTime(new Date());
    console.log(
      `Running daily default welcome mood assignment task at ${now.toISOString()}.`
    );
    await assignDefaultWelcomeMood();
  });
}

export { scheduleCreateDailySurvey, scheduleAssignDefaultWelcomeMood };
