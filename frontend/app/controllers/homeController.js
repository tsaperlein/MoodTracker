import { useState, useEffect } from 'react';

// Authorization Services
import { useAuth } from 'context/AuthContext';
// Daily Survey Services
import { useDailySurvey } from 'context/DailySurveyContext';

// Survey Services
import { fetchRemainingVersions } from 'services/survey';

export const useHomeController = () => {
  const { authData } = useAuth();
  const [remainingVersions, setRemainingVersions] = useState(null);

  const { dailySurveyCompleted } = useDailySurvey();

  useEffect(() => {
    async function getRemainingVersions() {
      try {
        const { remainingVersions } = await fetchRemainingVersions(authData.id);

        setRemainingVersions(remainingVersions);
      } catch (error) {
        console.error('An error occurred while fetching the remaining versions:', error);
        setRemainingVersions(null);
      }
    }

    getRemainingVersions();
  }, [authData, dailySurveyCompleted]);

  return { remainingVersions };
};
