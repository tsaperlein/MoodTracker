// SERVICE - Daily Tasks

import dotenv from "dotenv";
dotenv.config();

import { getXataClient } from "../xata.mjs";
const client = getXataClient();

// Packages
import schedule from "node-schedule";

import { createSurveyVersion, checkSurveyReadiness } from "./survey.mjs";
import { sendUserNotification } from "./notification.mjs";
import {
  fetchLatestWelcomeMood,
  handleCalculateAndSubmitWelcomeMood,
} from "./welcomeMood.mjs";

// Utilities
import {
  adjustToGreeceTime,
  areDatesOnDifferentDays,
} from "../utils/datetime.mjs";

// Schedules a job for a user at a random time between 12:00 and 21:00 Greek time
export async function scheduleDailySurveyForUser(user_id) {
  const randomHour = Math.floor(Math.random() * (21 - 12) + 12);
  const randomGreekHour = randomHour - 3;
  const randomMinute = Math.floor(Math.random() * 60);

  console.log(
    `Scheduling survey task for user ${user_id} at ${randomHour}:${randomMinute}`
  );

  // Schedule the job at the calculated random time
  schedule.scheduleJob(
    { hour: randomGreekHour, minute: randomMinute },
    async () => {
      try {
        // At the scheduled time, check the survey readiness
        const readinessResult = await checkSurveyReadiness(user_id);

        let result = { success: false };
        let type = "";

        // Decide whether to create a new survey or send a reminder
        if (readinessResult.isReady) {
          result = await createSurveyVersion(user_id); // Create a new survey version
          type = "survey creation";
        } else {
          type = "survey reminder";
        }

        // Send the appropriate notification based on the result or type
        await sendSurveyNotification(user_id, result.success, type);
      } catch (error) {
        console.error(
          `Error during scheduled survey task for user ${user_id}:`,
          error
        );
      }
    }
  );
}

// Sends a survey notification based on whether a survey was created or it's a reminder
async function sendSurveyNotification(user_id, surveyCreated, type) {
  const title =
    surveyCreated || type === "survey reminder"
      ? "Daily Survey Reminder"
      : "New Daily Survey Available";

  const body =
    surveyCreated || type === "survey reminder"
      ? "Your daily survey is ready. Please take a moment to complete it."
      : "Your new daily survey is ready. Please take a moment to complete it.";

  await sendUserNotification({
    params: { user_id },
    body: { title, body },
  });

  console.log(
    `Notification sent to user ${user_id} about the ${
      surveyCreated ? "new survey" : "survey reminder"
    }.`
  );
}

// Checks survey readiness for all users and schedules surveys accordingly
export async function checkAndScheduleSurveysForUsers() {
  const users = await client.db.User.getAll();

  for (const user of users) {
    try {
      // Schedule the survey check and task for each user
      await scheduleDailySurveyForUser(user.id);
    } catch (error) {
      console.error(`Error scheduling survey for user ${user.id}:`, error);
    }
  }
}

// Assigns the default "nothing" welcome mood for users who haven't selected a mood by end of day
export async function assignDefaultWelcomeMoodToUsers() {
  const users = await client.db.User.getAll();

  for (const user of users) {
    try {
      const latestMood = await fetchLatestWelcomeMood(user.id); // Find the latest welcome mood for the user
      const currentTime = adjustToGreeceTime(new Date()); // Adjust current time to Greece time

      // Check if the latest mood was submitted today
      if (
        !latestMood ||
        areDatesOnDifferentDays(latestMood.datetime, currentTime)
      ) {
        // Submit "nothing" mood if no mood was selected today
        await handleCalculateAndSubmitWelcomeMood(user.id, "nothing");
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
