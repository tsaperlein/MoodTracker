// ROUTES - Daily Tasks

import express from "express";
import { scheduleUpdateSurveyAnswers } from "../controllers/dailyTasks.mjs";

const router = express.Router();

// Define the route to get survey answers for a specific version
router.post(
  "/users/:user_id/schedule-update-daily-survey-answers",
  (req, res) => {
    try {
      scheduleUpdateSurveyAnswers();
      console.log("Survey update task has been scheduled via endpoint.");
      res
        .status(200)
        .json({ message: "Survey update task has been scheduled." });
    } catch (error) {
      console.error("Error scheduling survey update task:", error);
      res.status(500).json({
        message: "Failed to schedule survey update task.",
        error: error.message,
      });
    }
  }
);

export default router;
