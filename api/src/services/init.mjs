// SERVICES - Initialization

import dotenv from "dotenv";
dotenv.config();

import { getXataClient } from "../xata.mjs";
const client = getXataClient();

import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

// Utilities
import { adjustToGreeceTime, getRandomTimeForDay } from "../utils/datetime.mjs";
import { shuffleArray } from "../utils/array.mjs";

const userId = "rec_cr4fq1r0t56dbdseiu3g";
const moodTypes = ["nothing", "awful", "sad", "neutral", "good", "happy"];
const answerOptions = ["Not True", "Sometimes", "True"];

async function createSurveyVersion(
  newSurveyId,
  version,
  userId,
  questions,
  postedAt,
  completionTime
) {
  const survey = await client.db.Survey.create({
    survey_id: newSurveyId,
    version,
    user_id: userId,
    posted_at: postedAt.toISOString(),
    completion_time: completionTime.toISOString(),
  });

  if (!survey || !survey.id) {
    throw new Error("Failed to create survey.");
  }

  const answerPromises = questions.map((question) => {
    const randomAnswer =
      answerOptions[Math.floor(Math.random() * answerOptions.length)];
    return client.db.Answer.create({
      survey_id: survey.id,
      question_id: question.id,
      type: randomAnswer,
      comment: null,
    });
  });

  const answers = await Promise.all(answerPromises);

  if (!answers || answers.some((answer) => !answer)) {
    throw new Error("Failed to create some answers.");
  }
}

async function generateSurveysAndAnswers() {
  const startDate = new Date("2024-07-01");
  const endDate = new Date("2024-08-22");

  let currentDate = new Date(startDate);
  let surveyId = 1;

  const allQuestions = await client.db.Question.getAll();

  while (currentDate <= endDate) {
    for (let version = 1; version <= 3; version++) {
      let versionQuestions;

      if (version === 3) {
        versionQuestions = shuffleArray(allQuestions).slice(0, 5);
      } else {
        versionQuestions = shuffleArray(allQuestions).slice(
          0,
          Math.floor(allQuestions.length / 3)
        );
      }

      const postedAt = getRandomTimeForDay(currentDate);
      const completionTime = getRandomTimeForDay(currentDate);

      await createSurveyVersion(
        surveyId,
        version,
        userId,
        versionQuestions,
        postedAt,
        completionTime
      );

      currentDate.setDate(currentDate.getUTCDate() + 1); // Move to the next day
    }

    surveyId += 1; // Increment surveyId only after creating all 3 versions for it
  }

  console.log("Surveys and answers generated successfully.");
}

async function getRandomMoodId() {
  const moods = await client.db.WelcomeMood.getAll();
  const randomMood = moods[Math.floor(Math.random() * moods.length)];
  return randomMood.id;
}

async function populateChooses() {
  const startDate = new Date("2024-07-01");
  const endDate = new Date("2024-08-18");
  let currentDate = new Date(startDate);

  try {
    while (currentDate <= endDate) {
      const moodId = await getRandomMoodId();
      await client.db.Chooses.create({
        datetime: adjustToGreeceTime(currentDate).toISOString(),
        user_id: userId,
        welcome_mood_id: moodId,
      });
      currentDate.setDate(currentDate.getUTCDate() + 1); // Move to the next day
    }
    console.log("Chooses table populated.");
  } catch (error) {
    console.error("Error populating Chooses table:", error);
  }
}

async function createWelcomeMoods() {
  try {
    for (const mood of moodTypes) {
      await client.db.WelcomeMood.create({
        type: mood,
      });
    }
    console.log("WelcomeMood table populated.");
  } catch (error) {
    console.error("Error populating WelcomeMood table:", error);
  }
}

async function createQuestions() {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const filePath = path.join(__dirname, "../data/questions.json");
    const data = await fs.readFile(filePath, "utf8");

    const { questions } = JSON.parse(data);

    for (const question of questions) {
      await client.db.Question.create({
        question_id: question.id,
        text: question.text,
      });
    }
    console.log("Questions table populated.");
  } catch (error) {
    console.error("Error populating Questions table:", error);
  }
}

async function createMessages() {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const filePath = path.join(__dirname, "../data/messages.json");
    const data = await fs.readFile(filePath, "utf8");

    const { messages } = JSON.parse(data);

    for (const message of messages) {
      await client.db.Message.create({
        author: message.author,
        level: message.level,
        text: message.text,
        type: message.type,
      });
    }
    console.log("Messages table populated.");
  } catch (error) {
    console.error("Error populating Messages table:", error);
  }
}

// Service function to initialize the database
export async function initializeDatabase() {
  try {
    await createQuestions();
    await createMessages();
    await createWelcomeMoods();
    await populateChooses();
    await generateSurveysAndAnswers();
    console.log("Database initialized.");
  } catch (error) {
    console.error("Error initializing database:", error.message);
    throw new Error("Error initializing the database");
  }
}

// Service function to empty the database
export async function clearDatabase() {
  try {
    // Uncomment and implement the logic to delete data from all relevant tables
    // await client.db.User.deleteMany({});
    // await client.db.WelcomeMood.deleteMany({});
    // await client.db.Question.deleteMany({});
    // await client.db.Survey.deleteMany({});
    // await client.db.Answer.deleteMany({});
    // await client.db.Chooses.deleteMany({});
    console.log("Database cleared.");
  } catch (error) {
    console.error("Error clearing database:", error.message);
    throw new Error("Error clearing the database");
  }
}
