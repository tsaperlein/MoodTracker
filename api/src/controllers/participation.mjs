// CONTROLLERS - Participation

import dotenv from "dotenv";
dotenv.config();

import { calculateParticipation } from "../services/participation.mjs";

// Controller for getting user participation
export async function getUserParticipation(req, res) {
  const { user_id } = req.params;

  try {
    // Call the service function to calculate participation
    const { participation } = await calculateParticipation(user_id);

    return res.json({ success: true, participation });
  } catch (error) {
    console.error("Error in getUserParticipation:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
