import express from "express";
import dotenv from "dotenv";

dotenv.config();

// Routes
import initRoutes from "./routes/init.mjs";
import authRoutes from "./routes/auth.mjs";
import userRoutes from "./routes/user.mjs";
import surveyRoutes from "./routes/survey.mjs";
import welcomeMoodRoutes from "./routes/welcomeMood.mjs";
import messageRoutes from "./routes/message.mjs";
import notificationRoutes from "./routes/notification.mjs";

// Daily Task Routes
import {
  scheduleAssignDefaultWelcomeMood,
  scheduleCreateDailySurvey,
} from "./controllers/dailyTasks.mjs";
import dailyTasksRoutes from "./routes/dailyTasks.mjs";
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

// Quote
app.use(messageRoutes);

// Notifications
app.use(notificationRoutes);

app.use(dailyTasksRoutes);

app.get("/", async (req, res) => {
  return res.json({ ok: true });
});

app.listen(PORT, () => {
  console.log(`App is listening on port http://localhost:${PORT}`);

  // Start scheduled tasks
  scheduleCreateDailySurvey();
  scheduleReminderNotifications();
  scheduleAssignDefaultWelcomeMood();
});
