import express from "express";
import dotenv from "dotenv";
import { getXataClient } from "./xata.js";
import {
  User,
  Emoji,
  Quote,
  Assigns,
  DailyMood,
  DiaryPage,
  Survey,
} from "./mt_database.js"; // assuming the data is in a separate file called data.js

dotenv.config();

const { PORT } = process.env;

const app = express();

app.use(express.json({ limit: "50mb" }));

const client = getXataClient();

async function createIfNotExists(collection, data) {
  for (const item of data) {
    const existingItem = await client.db[collection].read(item.id);
    if (!existingItem) {
      await client.db[collection].create(item);
    }
  }
}

app.get("/init", async (req, res) => {
  try {
    await createIfNotExists("User", User);
    await createIfNotExists("Emoji", Emoji);
    await createIfNotExists("Quote", Quote);
    await createIfNotExists("Assigns", Assigns);
    await createIfNotExists("DailyMood", DailyMood);
    await createIfNotExists("DiaryPage", DiaryPage);
    await createIfNotExists("Survey", Survey);

    return res.json({ message: "Data initialized successfully" });
  } catch (error) {
    console.error("Error initializing data:", error);
    return res.status(500).json({ error: "Failed to initialize data" });
  }
});

app.get("/", async (req, res) => {
  const result = await client.db.User.getAll();
  return res.json({ results: result });
});

app.listen(PORT, () => {
  console.log(`App is listening on port http://localhost:${PORT}`);
});
