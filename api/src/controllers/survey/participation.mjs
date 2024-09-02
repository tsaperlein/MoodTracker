import dotenv from "dotenv";
dotenv.config();

import { getXataClient } from "../../xata.mjs";
const client = getXataClient();

async function calculateUserParticipation(userId) {
  try {
    // Fetch all surveys and their answers for the user
    const surveys = await client.db.Survey.filter({ user_id: userId }).getAll();

    if (!surveys || surveys.length === 0) {
      return 0;
    }

    let totalParticipationScore = 0;
    let totalSurveys = surveys.length;

    for (const survey of surveys) {
      const { posted_at, completion_time } = survey;

      if (!completion_time) {
        // If there's no completion time, consider it as no participation
        totalParticipationScore += 0;
        continue;
      }

      const postedDate = new Date(posted_at);
      const completionDate = new Date(completion_time);

      // Calculate the number of days difference between the posting and completion date
      const timeDifference = completionDate - postedDate;
      const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

      let participationScore = 1 / (daysDifference + 1);

      totalParticipationScore += participationScore;
    }

    // Calculate the participation percentage
    const participationPercentage =
      (totalParticipationScore / totalSurveys) * 100;

    return participationPercentage.toFixed(2);
  } catch (error) {
    console.error(
      "An error occurred while calculating user participation:",
      error
    );
    throw error;
  }
}

async function getUserParticipation(req, res) {
  const { user_id } = req.params;

  try {
    const participation = await calculateUserParticipation(user_id);

    return res.json({ success: true, participation });
  } catch (error) {
    console.error("Error in getUserParticipation:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

export { calculateUserParticipation, getUserParticipation };
