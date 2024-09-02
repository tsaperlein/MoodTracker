import dotenv from "dotenv";
dotenv.config();

import { getXataClient } from "../xata.mjs";
const client = getXataClient();

import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

import { adjustToGreeceTime } from "../utils/datetime.mjs";

const userId = "rec_cr4fq1r0t56dbdseiu3g";
const moodTypes = ["nothing", "awful", "sad", "neutral", "good", "happy"];
const answerOptions = ["Not True", "Sometimes", "True"];

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function getRandomTimeForDay(day) {
  const start = new Date(day);
  start.setHours(0, 0, 0, 0);

  const end = new Date(day);
  end.setHours(23, 59, 59, 999);

  const randomTime = new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
  return adjustToGreeceTime(randomTime); // Adjust to Greece time
}

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
    // Get the directory name using import.meta.url and URL
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    // Read the questions.json file
    const filePath = path.join(__dirname, "../data/questions.json");
    const data = await fs.readFile(filePath, "utf8");

    // Parse the JSON data
    const { questions } = JSON.parse(data);

    // Iterate over the questions and create entries in the database
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
    // Get the directory name using import.meta.url and URL
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    // Read the messages.json file
    const filePath = path.join(__dirname, "../data/messages.json");
    const data = await fs.readFile(filePath, "utf8");

    // Parse the JSON data
    const { messages } = JSON.parse(data);

    // Iterate over the messages and create entries in the database
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

async function initDB(req, res) {
  try {
    // // Create WelcomeMoods
    // await createWelcomeMoods();

    // // Create Questions and Quotes
    // await createQuestions();
    await createMessages();

    // // Create Chooses entries for the specific user
    // await populateChooses();

    // // Create Surveys
    // await generateSurveysAndAnswers();

    return res.status(200).json({
      message:
        "Database initialized with welcome moods, questions, quotes, chooses data, and surveys with answers for the specified user",
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      message: "Error initializing the database",
      error,
    });
  }
}

async function emptyDB(req, res) {
  try {
    // // Delete all records from the database
    // await client.db.User.deleteMany({});
    // await client.db.Quote.deleteMany({});
    // await client.db.WelcomeMood.deleteMany({});
    // await client.db.Question.deleteMany({});
    // await client.db.Survey.deleteMany({});
    // await client.db.Answer.deleteMany({});
    // await client.db.Assigns.deleteMany({});
    // await client.db.Chooses.deleteMany({});

    return res.status(200).json({ message: "Database emptied" });
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(500)
      .json({ message: "Error emptying the database", error });
  }
}

export { initDB, emptyDB };
