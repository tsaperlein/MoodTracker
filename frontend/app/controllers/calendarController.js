import { useState, useEffect, useContext } from 'react';

// Authorization Services
import { AuthContext } from 'context/AuthContext';
// Welcome Mood Services
import { fetchAllWelcomeMoods } from 'services/welcomeMood';

// Custom Hook for Calendar Data Management
export function useCalendarController(currentMonth = null, setMoodCounts = null) {
  const { authData } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [markedDates, setMarkedDates] = useState({});

  useEffect(() => {
    const loadAllWelcomeMoods = async () => {
      if (authData && authData.id) {
        const userId = authData.id;
        const result = await fetchAllWelcomeMoods(userId);

        if (result.success) {
          const moodData = result.data.reduce((acc, moodEntry) => {
            const date = moodEntry.datetime.slice(0, 10);
            const moodType = moodEntry.welcome_mood_id?.type;

            if (moodType !== undefined) {
              acc[date] = { mood: moodType };
            }
            return acc;
          }, {});

          setMarkedDates(moodData);
        } else {
          console.error('Error fetching welcome moods:', result.message);
        }
        setLoading(false);
      } else {
        console.error('No user ID found');
        setLoading(false);
      }
    };

    loadAllWelcomeMoods();
  }, [authData]);

  if (currentMonth && setMoodCounts) {
    useEffect(() => {
      const counts = getMoodCountsForMonth(currentMonth, markedDates);
      setMoodCounts(counts);
    }, [currentMonth, markedDates]);
  }

  return { loading, markedDates };
}

export function getMoodCountsForMonth(month, markedDates) {
  const counts = {};

  Object.entries(markedDates).forEach(([date, { mood }]) => {
    const dateObj = new Date(date);
    const dateMonth = dateObj.getMonth() + 1;

    if (dateMonth === month) {
      counts[mood] = (counts[mood] || 0) + 1;
    }
  });

  return counts;
}
