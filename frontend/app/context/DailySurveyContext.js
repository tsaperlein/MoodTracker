import React, { createContext, useState, useEffect, useContext } from 'react';

// Survey Services
import { fetchLatestSurvey } from 'services/survey';
// Answer Services
import { isSurveyFinished } from 'services/answer';

export const DailySurveyContext = createContext();
export const useDailySurvey = () => useContext(DailySurveyContext);

// Authorization Services
import { useAuth } from 'context/AuthContext';

// Utilities
import { adjustToGreeceTime, areSameDay } from '../utilities/datetime';

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

      console.log(finished);

      if (typeof finished !== 'boolean' || !finished) {
        setDailySurveyCompleted(false);
        return;
      }

      // Ensure completionTime exists and is a valid Date
      if (!latestSurvey.completionTime) {
        console.error('completionTime is missing in the latest survey.');
        setDailySurveyCompleted(false);
        return;
      }

      const completionDate = new Date(latestSurvey.completionTime);

      // Check if the conversion to a date was successful
      if (isNaN(completionDate.getTime())) {
        console.error('Invalid completionTime in the latest survey.');
        setDailySurveyCompleted(false);
        return;
      }

      // Adjust the completion date to Greece time
      const today = adjustToGreeceTime(new Date());

      // Check if the completion date and today are the same day
      if (areSameDay(completionDate, today)) {
        setDailySurveyCompleted(true);
      } else {
        setDailySurveyCompleted(false);
      }
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
