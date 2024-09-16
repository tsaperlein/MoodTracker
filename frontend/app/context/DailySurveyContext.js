import React, { createContext, useState, useEffect, useContext } from 'react';
import { View, Text } from 'react-native';

// Survey Services
import { fetchLatestSurvey } from 'services/survey';
// Answer Services
import { isSurveyFinished } from 'services/answer';

// Authorization Services
import { useAuth } from 'context/AuthContext';

// Utilities
import { adjustToGreeceTime, areSameDay } from '../utilities/datetime';

export const DailySurveyContext = createContext();
export const useDailySurvey = () => useContext(DailySurveyContext);

export const DailySurveyProvider = ({ children }) => {
  const { authData } = useAuth();
  const [loading, setLoading] = useState(true);
  const [dailySurveyCompleted, setDailySurveyCompleted] = useState(false);

  // Function to check the survey status
  const checkDailySurvey = async () => {
    if (!authData || !authData.id) {
      setDailySurveyCompleted(false);
      setLoading(false);
      return;
    }
    try {
      const latestSurvey = await fetchLatestSurvey(authData.id);

      if (!latestSurvey || !latestSurvey.id) {
        console.log('No latest survey found');
        setDailySurveyCompleted(false);
        setLoading(false);
        return;
      }

      const { finished } = await isSurveyFinished(latestSurvey.id);

      if (typeof finished !== 'boolean' || !finished) {
        console.log('Survey not finished');
        setDailySurveyCompleted(false);
        setLoading(false);
        return;
      }

      if (!latestSurvey.completionTime) {
        console.error('completionTime is missing in the latest survey.');
        setDailySurveyCompleted(false);
        setLoading(false);
        return;
      }

      const completionDate = new Date(latestSurvey.completionTime);

      if (isNaN(completionDate.getTime())) {
        console.error('Invalid completionTime in the latest survey.');
        setDailySurveyCompleted(false);
        setLoading(false);
        return;
      }

      const today = adjustToGreeceTime(new Date());

      if (areSameDay(completionDate, today)) {
        setDailySurveyCompleted(true);
      } else {
        setDailySurveyCompleted(false);
      }
    } catch (error) {
      console.error('An error occurred while checking the survey status:', error);
      setDailySurveyCompleted(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkDailySurvey();
  }, [authData]);

  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <DailySurveyContext.Provider value={{ dailySurveyCompleted, setDailySurveyCompleted }}>
      {children}
    </DailySurveyContext.Provider>
  );
};
