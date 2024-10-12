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

  // Ensure there are at least 5 moods, including at least one 'additional'
  let moodsWithAdditional = [...moods];

  // Calculate how many additional moods are needed to reach at least 5 moods
  const minimumMoodsRequired = 5;
  const additionalMoodsNeeded = Math.max(0, minimumMoodsRequired - moodsWithAdditional.length);

  // Add 'additional' placeholder moods if necessary to make sure we have at least 5 moods
  for (let i = 0; i < additionalMoodsNeeded; i++) {
    moodsWithAdditional.push({ type: 'additional' });
  }

  // Ensure one more 'additional' mood is always added at the end
  moodsWithAdditional.push({ type: 'additional' });

  return { moodsWithAdditional };
};
