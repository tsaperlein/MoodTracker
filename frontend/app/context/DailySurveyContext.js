import React, { createContext, useState, useEffect, useContext } from 'react';

// Survey Services
import { fetchLatestSurvey } from 'services/survey';
// Answer Services
import { isSurveyFinished } from 'services/answer';

export const DailySurveyContext = createContext();
export const useDailySurvey = () => useContext(DailySurveyContext);

// Authorization Services
import { useAuth } from 'context/AuthContext';

export const DailySurveyProvider = ({ children }) => {
  const { authData } = useAuth();
  const [dailySurveyCompleted, setDailySurveyCompleted] = useState(false);

  // Function to check the survey status
  const checkDailySurvey = async () => {
    if (!authData || !authData.id) {
      setDailySurveyCompleted(false);
      return;
    }
    try {
      const latestSurvey = await fetchLatestSurvey(authData.id);

      if (!latestSurvey || !latestSurvey.id) {
        setDailySurveyCompleted(false);
        return;
      }

      const { finished } = await isSurveyFinished(latestSurvey.id);

      if (typeof finished !== 'boolean' || !finished) {
        setDailySurveyCompleted(false);
        return;
      }

      setDailySurveyCompleted(finished);
    } catch (error) {
      console.error('An error occurred while checking the survey status:', error);
      setDailySurveyCompleted(false);
    }
  };

  // Effect to check survey status on component mount
  useEffect(() => {
    checkDailySurvey();
  }, [authData]);

  return (
    <DailySurveyContext.Provider value={{ dailySurveyCompleted, setDailySurveyCompleted }}>
      {children}
    </DailySurveyContext.Provider>
  );
};
