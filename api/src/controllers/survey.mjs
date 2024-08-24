// CONTROLLER - Survey

import dotenv from "dotenv";
dotenv.config();

import { getXataClient } from "../xata.mjs";
const client = getXataClient();

// Helper function to shuffle an array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Helper function to create a survey version with assigned questions
async function createSurveyVersion(
  newSurveyId,
  version,
  userId,
  questions,
  postedAt,
  completionTime
) {
  if (!(postedAt instanceof Date)) {
    postedAt = new Date(postedAt);
  }
  if (!(completionTime instanceof Date)) {
    completionTime = new Date(completionTime);
  }

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

  // Create all answers concurrently and wait for all of them to complete
  const answerPromises = questions.map((question) =>
    client.db.Answer.create({
      survey_id: survey.id,
      question_id: { id: question.id }, // Ensure the question_id is correctly linked
      type: null,
      comment: null,
    })
  );

  // Wait for all promises to resolve
  const answers = await Promise.all(answerPromises);

  if (!answers || answers.some((answer) => !answer)) {
    throw new Error("Failed to create some answers.");
  }
}

function getRandomTimeForDay(day) {
  const start = new Date(day);
  start.setHours(0, 0, 0, 0);

  const end = new Date(day);
  end.setHours(23, 59, 59, 999);

  const randomTime = new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
  return randomTime.toISOString();
}

async function createDailySurvey(req, res) {
  try {
    const { user_id } = req.body;

    // Fetch the last survey
    const lastSurvey = await client.db.Survey.filter({ user_id: user_id })
      .sort("survey_id", "desc")
      .getFirst();

    let newSurveyId;
    let newVersion;
    let usedQuestionIds = [];

    if (lastSurvey) {
      const lastSurveyId = lastSurvey.survey_id;
      const lastVersion = await client.db.Survey.filter({
        survey_id: lastSurveyId,
      })
        .sort("version", "desc")
        .getFirst();

      if (lastVersion.version === 3) {
        newSurveyId = lastSurveyId + 1;
        newVersion = 1;
      } else {
        newSurveyId = lastSurveyId;
        newVersion = lastVersion.version + 1;
      }

      const previousVersions = await client.db.Survey.filter({
        survey_id: lastSurveyId,
      }).getAll();

      for (const version of previousVersions) {
        const previousAnswers = await client.db.Answer.filter({
          survey_id: version.id,
        }).getAll();
        usedQuestionIds.push(
          ...previousAnswers.map((answer) => answer.question_id.id)
        );
      }
    } else {
      newSurveyId = 1;
      newVersion = 1;
    }

    const allQuestions = await client.db.Question.getAll();
    let availableQuestions = allQuestions.filter(
      (question) => !usedQuestionIds.includes(question.id)
    );

    // If no available questions are left, reshuffle and reuse the previous questions
    if (availableQuestions.length === 0) {
      availableQuestions = allQuestions; // Reuse all questions
    }

    let numberOfQuestions;
    if (newVersion === 3) {
      numberOfQuestions = 5;
    } else {
      numberOfQuestions = Math.floor(allQuestions.length / 3);
    }

    const versionQuestions = shuffleArray(availableQuestions).slice(
      0,
      numberOfQuestions
    );

    const today = new Date();
    const postedAt = getRandomTimeForDay(today);
    const completionTime = getRandomTimeForDay(today);

    await createSurveyVersion(
      newSurveyId,
      newVersion,
      user_id,
      versionQuestions,
      postedAt,
      completionTime
    );

    return res.status(201).json({
      message: `Survey version ${newVersion} created for survey ID ${newSurveyId}.`,
      surveyId: newSurveyId,
      version: newVersion,
    });
  } catch (error) {
    console.error("Error creating daily survey:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}

async function findLatestSurvey(userId) {
  try {
    const latestSurvey = await client.db.Survey.filter({ user_id: userId })
      .sort("survey_id", "desc")
      .getFirst();

    if (!latestSurvey) {
      return {
        message: "No surveys found for this user.",
        surveyId: null,
        latestVersion: null,
        postedAt: null,
      };
    }

    const latestSurveyId = latestSurvey.survey_id;

    const latestVersion = await client.db.Survey.filter({
      survey_id: latestSurveyId,
    })
      .sort("version", "desc")
      .getFirst();

    return {
      surveyId: latestSurveyId,
      version: latestVersion.version,
      postedAt: latestVersion.posted_at,
    };
  } catch (error) {
    console.error(
      "Error finding the latest survey and version:",
      error.message
    );
    throw new Error("Internal server error");
  }
}

async function getLatestSurvey(req, res) {
  try {
    const { user_id } = req.params;
    const result = await findLatestSurvey(user_id);

    if (!result.surveyId) {
      return res.status(404).json({ message: result.message });
    }

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function getSurvey(req, res) {
  try {
    const { user_id, survey_id } = req.params;
    const survey = await client.db.Survey.filter({
      user_id: user_id,
      id: survey_id,
    }).getFirst();

    const surveyData = {
      surveyId: survey.survey_id,
      version: survey.version,
      postedAt: survey.posted_at,
    };

    return res.status(200).json(surveyData);
  } catch (error) {
    console.error(
      "Error finding the latest survey and version:",
      error.message
    );
    throw new Error("Internal server error");
  }
}

async function getPreviousSurveys(req, res) {
  try {
    const { user_id } = req.params;

    // Fetch all surveys for the user
    const surveys = await client.db.Survey.filter({ user_id: user_id })
      .sort("posted_at", "desc")
      .getAll();

    if (!surveys || surveys.length === 0) {
      return res
        .status(404)
        .json({ message: "No surveys found for this user." });
    }

    // Group surveys by survey_id and sort them by version within each group
    const groupedSurveys = surveys.reduce((acc, survey) => {
      if (!acc[survey.survey_id]) {
        acc[survey.survey_id] = [];
      }
      acc[survey.survey_id].push(survey);
      return acc;
    }, {});

    // Convert grouped surveys into an array of survey groups sorted by survey_id
    const surveyGroups = Object.keys(groupedSurveys).map((surveyId) => ({
      surveyId,
      versions: groupedSurveys[surveyId].sort((a, b) => b.version - a.version),
    }));

    return res.status(200).json(surveyGroups);
  } catch (error) {
    console.error("Error fetching previous surveys:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}

export {
  createDailySurvey,
  findLatestSurvey,
  getLatestSurvey,
  getSurvey,
  getPreviousSurveys,
};
