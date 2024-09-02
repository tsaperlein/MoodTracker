import { useState, useEffect, useContext } from 'react';

// Authorization Services
import { AuthContext } from 'context/AuthContext';
// Mood Level Services
import { fetchUserMoodLevel } from 'services/moodLevel';

// Utility to fetch and process survey data
export const useHomeController = () => {
  const { authData } = useContext(AuthContext);
  const [moodLevel, setMoodLevel] = useState(null);

  useEffect(() => {
    async function getMoodLevel() {
      const result = await fetchUserMoodLevel(authData.id);
      if (result.success) {
        setMoodLevel(result.moodLevel);
      } else {
        console.error(result.message);
      }
    }
    getMoodLevel();
  }, [authData]);

  return { moodLevel: moodLevel };
};
