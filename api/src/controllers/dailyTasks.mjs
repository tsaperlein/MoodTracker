// CONTROLLERS - Daily Tasks

import dotenv from "dotenv";
dotenv.config();

// Packages
import schedule from "node-schedule";

import {
  assignDefaultWelcomeMoodToUsers,
  checkAndScheduleSurveysForUsers,
} from "../services/dailyTasks.mjs";

// Utilities
import { adjustToGreeceTime } from "../utils/datetime.mjs";

// Schedule job to run every day to check survey readiness and schedule surveys
export function scheduleCreateDailySurvey() {
  // This will run at a fixed time every day, e.g., 00:00 AM, but adjusted to 21:00 because of time difference
  schedule.scheduleJob({ hour: 21, minute: 0 }, async () => {
    const now = adjustToGreeceTime(new Date());
    console.log(
      `Running daily survey scheduling task at ${now.toISOString()}.`
    );
    await checkAndScheduleSurveysForUsers(); // Service function handles business logic
  });
}

// Schedule job to run every day at 23:59 PM to assign default welcome moods
export function scheduleAssignDefaultWelcomeMood() {
  // Schedule job to run every day at 23:59 PM, adjusted for time difference
  schedule.scheduleJob({ hour: 20, minute: 59 }, async () => {
    const now = adjustToGreeceTime(new Date());
    console.log(
      `Running daily default welcome mood assignment task at ${now.toISOString()}.`
    );
    await assignDefaultWelcomeMoodToUsers(); // Service function handles business logic
  });
}
