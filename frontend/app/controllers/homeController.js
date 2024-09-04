import { useState, useEffect, useContext } from 'react';

// Authorization Services
import { AuthContext } from 'context/AuthContext';
// Mood Level Services
import { fetchUserMoodLevel } from 'services/moodLevel';
// Answer Services
import { isSurveyFinished } from 'services/answer';
// Survey Services
import { fetchLatestSurvey } from '../services/survey';

export const useHomeController = () => {
  const { authData } = useContext(AuthContext);
  const [moodLevel, setMoodLevel] = useState(null);
  const [latestSurveyId, setLatestSurveyId] = useState(null);
  const [surveyCompleted, setSurveyCompleted] = useState(false);

  useEffect(() => {
    async function getMoodLevel() {
      const result = await fetchUserMoodLevel(authData.id);
      if (result.success) {
        setMoodLevel(result.moodLevel);
      } else {
        console.error(result.message);
      }
    }

    // Fetch the latest survey and check if it is completed
    async function checkLatestSurvey() {
      const latestSurveyResult = await fetchLatestSurvey(authData.id);

      if (latestSurveyResult.success) {
        const { surveyId } = latestSurveyResult;
        setLatestSurveyId(surveyId);

        // Now check if the latest survey is finished
        const surveyStatusResult = await isSurveyFinished(surveyId);
        if (surveyStatusResult.success) {
          setSurveyCompleted(surveyStatusResult.finished);
        } else {
          console.error(surveyStatusResult.message);
        }
      } else {
        console.error(latestSurveyResult.message);
      }
    }

    getMoodLevel();
    checkLatestSurvey();
  }, [authData]);

  return {
    moodLevel,
    latestSurveyId,
    surveyCompleted,
  };
};
