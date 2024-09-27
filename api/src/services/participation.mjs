import dotenv from "dotenv";
dotenv.config();

import { getXataClient } from "../xata.mjs";
const client = getXataClient();

import { findAllSurveysByUser } from "./survey.mjs";

// Service function to calculate user participation
export async function calculateParticipation(user_id) {
  try {
    // Use the findAllSurveysByUser function to fetch all surveys for the user
    const {
      success: allSurveysSuccess,
      surveys,
      error: allSurveysError,
    } = await findAllSurveysByUser(user_id);

    // If there is an error or no surveys found, handle it gracefully
    if (!allSurveysSuccess || !surveys || surveys.length === 0) {
      const errorMessage = allSurveysError || "No surveys found for the user.";
      console.error(errorMessage);
      return { success: false, error: errorMessage };
    }

    let totalParticipationScore = 0;
    let totalSurveys = surveys.length;

    for (const survey of surveys) {
      const { posted_at, completion_time } = survey;

      if (!completion_time) {
        // If there's no completion time, no participation is recorded
        continue;
      }

      const postedDate = new Date(posted_at);
      const completionDate = new Date(completion_time);

      // Ensure that completionDate is after postedDate
      if (completionDate <= postedDate) {
        // Skip this survey if the completion date is invalid
        continue;
      }

      // Calculate the number of days difference between posting and completion date
      const timeDifference = completionDate - postedDate;
      const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

      // If daysDifference is zero, assign a minimum value of 1 day to avoid division by zero
      const adjustedDaysDifference = daysDifference > 0 ? daysDifference : 1;

      // Calculate the participation score based on time taken to complete the survey
      let participationScore = 1 / (adjustedDaysDifference + 1);
      totalParticipationScore += participationScore;
    }

    // Calculate the participation percentage
    const participationPercentage =
      (totalParticipationScore / totalSurveys) * 100;

    // Return success with the calculated percentage
    return { success: true, participation: participationPercentage.toFixed(2) };
  } catch (error) {
    const errorMessage =
      "An error occurred while calculating user participation.";
    console.error(`${errorMessage}:`, error);
    return { success: false, error: errorMessage };
  }
}
