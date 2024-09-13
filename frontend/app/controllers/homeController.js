import { useState, useEffect } from 'react';

// Authorization Services
import { useAuth } from 'context/AuthContext';
// Daily Survey Services
import { useDailySurvey } from '../context/DailySurveyContext';

// Mood Level Services
import { fetchUserMoodLevel } from 'services/moodLevel';
// Survey Services
import { fetchRemainingVersions } from 'services/survey';

export const useHomeController = () => {
  const { authData } = useAuth();
  const [moodLevel, setMoodLevel] = useState(null);
  const [remainingVersions, setRemainingVersions] = useState(null);

  const { dailySurveyCompleted } = useDailySurvey;

  useEffect(() => {
    async function getMoodLevel() {
      const result = await fetchUserMoodLevel(authData.id);
      if (result.success) {
        setMoodLevel(result.moodLevel);
      } else {
        console.error(result.message);
      }
    }

    async function getRemainingVersions() {
      try {
        const { remainingVersions } = await fetchRemainingVersions(authData.id);

        setRemainingVersions(remainingVersions);
      } catch (error) {
        console.error('An error occurred while fetching the remaining versions:', error);
        setRemainingVersions(null);
      }
    }

    getMoodLevel();
    getRemainingVersions();
  }, [authData, dailySurveyCompleted]);

  return {
    moodLevel,
    dailySurveyCompleted,
    remainingVersions,
  };
};
