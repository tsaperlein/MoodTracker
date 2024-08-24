import express from "express";
import dotenv from "dotenv";

// Routes
import initRoutes from "./routes/init.mjs";
import authRoutes from "./routes/auth.mjs";
import userRoutes from "./routes/user.mjs";
import surveyRoutes from "./routes/survey.mjs";
import answerRoutes from "./routes/answer.mjs";
import questionRoutes from "./routes/question.mjs";
import welcomeMoodRoutes from "./routes/welcomeMood.mjs";
import quoteRoutes from "./routes/quote.mjs";

dotenv.config();

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

// Answer
app.use(answerRoutes);

// Question
app.use(questionRoutes);

// Welcome Mood
app.use(welcomeMoodRoutes);

// Quote
// app.use(quoteRoutes);

app.get("/", async (req, res) => {
  return res.json({ ok: true });
});

app.listen(PORT, () => {
  console.log(`App is listening on port http://localhost:${PORT}`);
});
