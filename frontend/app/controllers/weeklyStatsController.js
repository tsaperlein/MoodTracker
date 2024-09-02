import { useState, useEffect } from 'react';

// Welcome Mood Services
import { fetchLatestWeekWelcomeMoods } from 'services/welcomeMood';

export const useWeeklyStatsController = (authData) => {
  const [moods, setMoods] = useState([]);

  useEffect(() => {
    const fetchMoods = async () => {
      try {
        const { data } = await fetchLatestWeekWelcomeMoods(authData.id);
        setMoods(data);
      } catch (error) {
        console.error('Error fetching welcome moods:', error);
      }
    };
    fetchMoods();
  }, [authData.id]);

  // Ensure there are at least 4 moods, with the last one being 'additional'
  const moodsWithAdditional = [...moods];
  const additionalMoodsNeeded = Math.max(0, 5 - moodsWithAdditional.length);

  // Add additional placeholder moods if necessary
  for (let i = 0; i < additionalMoodsNeeded; i++) {
    moodsWithAdditional.push({ type: 'additional' });
  }

  // Ensure the last mood is always 'additional'
  if (moodsWithAdditional.length > 0) {
    moodsWithAdditional[moodsWithAdditional.length - 1] = { type: 'additional' };
  } else {
    moodsWithAdditional.push({ type: 'additional' });
  }

  return { moodsWithAdditional };
};
