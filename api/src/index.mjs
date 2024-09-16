import express from "express";
import dotenv from "dotenv";

dotenv.config();

// Routes
import answerRoutes from "./routes/answer.mjs";
import authRoutes from "./routes/auth.mjs";
import emailRoutes from "./routes/email.mjs";
import imageRoutes from "./routes/image.mjs";
import initRoutes from "./routes/init.mjs";
import messageRoutes from "./routes/message.mjs";
import moodLevelRoutes from "./routes/moodLevel.mjs";
import notificationRoutes from "./routes/notification.mjs";
import participationRoutes from "./routes/participation.mjs";
import questionRoutes from "./routes/question.mjs";
import scoreRoutes from "./routes/score.mjs";
import streakCountRoutes from "./routes/streakCount.mjs";
import surveyRoutes from "./routes/survey.mjs";
import userRoutes from "./routes/user.mjs";
import welcomeMoodRoutes from "./routes/welcomeMood.mjs";

// Daily Task Routes
import {
  scheduleAssignDefaultWelcomeMood,
  scheduleCreateDailySurvey,
} from "./controllers/dailyTasks.mjs";
// Notifications Routes
import { scheduleReminderNotifications } from "./controllers/notification.mjs";

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json({ limit: "50mb" }));

// Initialization
app.use(initRoutes);

// Authentication
app.use(authRoutes);

// User
app.use(userRoutes);

// Survey
app.use(surveyRoutes);

// Welcome Mood
app.use(welcomeMoodRoutes);

// Quotes (Messages)
app.use(messageRoutes);

// Notifications
app.use(notificationRoutes);

// Answers
app.use(answerRoutes);

// Email
app.use(emailRoutes);

// Image
app.use(imageRoutes);

// Mood Level
app.use(moodLevelRoutes);

// Participation
app.use(participationRoutes);

// Questions
app.use(questionRoutes);

// Scores
app.use(scoreRoutes);

// Streak Count
app.use(streakCountRoutes);

// Root route for checking server status
app.get("/", async (req, res) => {
  return res.json({ ok: true });
});

app.listen(PORT, () => {
  console.log("App is listening on http://34.118.22.178");

  // Start scheduled tasks
  scheduleCreateDailySurvey();
  scheduleReminderNotifications();
  scheduleAssignDefaultWelcomeMood();
});
