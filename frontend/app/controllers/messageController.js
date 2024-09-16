import React, { useState, useEffect } from 'react';

// Authorization Services
import { useAuth } from 'context/AuthContext';

// Message Services
import { fetchMessageByLevel } from 'services/message';
// Mood Level Services
import { fetchUserMoodLevel } from 'services/moodLevel';

export const useMessageController = (dailySurveyCompleted) => {
  const { authData } = useAuth();

  const [userMessage, setUserMessage] = useState(null);
  const [moodLevel, setMoodLevel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!authData || !authData.id) {
      console.log('No authData found');
      setLoading(false);
      return;
    }

    const getMoodLevel = async () => {
      try {
        const result = await fetchUserMoodLevel(authData.id);
        if (result.success) {
          setMoodLevel(result.moodLevel);
        } else {
          console.error(result.message);
        }
      } catch (err) {
        setError('An error occurred while fetching the mood level.');
      } finally {
        setLoading(false);
      }
    };

    const loadMessage = async () => {
      try {
        const result = await fetchMessageByLevel(moodLevel);
        if (result.success) {
          setUserMessage(result.data);
        } else {
          setError(result.message);
        }
      } catch (err) {
        setError('An error occurred while fetching the message.');
      } finally {
        setLoading(false);
      }
    };

    getMoodLevel();
    loadMessage();
  }, [authData, moodLevel, dailySurveyCompleted]);

  return { moodLevel, userMessage, loading, error };
};
