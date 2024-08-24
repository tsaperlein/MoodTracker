import React, { createContext, useState, useEffect, useContext } from 'react';

// Welcome Mood Services
import { fetchLatestWelcomeMood } from 'services/welcomeMood';

// Authorization Services
import { AuthContext } from 'context/AuthContext';

export const MoodContext = createContext();

export const MoodProvider = ({ children }) => {
  const { authData } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [hasChosenMood, setHasChosenMood] = useState(false);

  const checkMoodStatus = async () => {
    if (authData && authData.id) {
      try {
        const result = await fetchLatestWelcomeMood(authData.id);

        if (result.success && result.data && result.data.datetime) {
          const latestMoodDate = new Date(result.data.datetime);
          const today = new Date();
          const isToday = latestMoodDate.toDateString() === today.toDateString();
          setHasChosenMood(isToday);
        } else {
          setHasChosenMood(false);
        }
      } catch (error) {
        console.error('Error fetching latest welcome mood:', error);
        setHasChosenMood(false);
      }
    } else {
      setHasChosenMood(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    checkMoodStatus();
  }, [authData]);

  return (
    <MoodContext.Provider value={{ hasChosenMood, setHasChosenMood, loading, checkMoodStatus }}>
      {children}
    </MoodContext.Provider>
  );
};
