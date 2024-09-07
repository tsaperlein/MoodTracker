import { useState, useEffect, useContext } from 'react';

// Authorization Services
import { AuthContext } from 'context/AuthContext';
// Answer Services
import { fetchLatestWeekSurveyScore, fetchAllWeeksSurveyScore } from 'services/score';

// Utility to fetch and process survey data
export const useGraphData = ({ screen }) => {
  const { authData } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        let response;
        if (screen === 'Home') response = await fetchLatestWeekSurveyScore(authData.id);
        else if (screen === 'Graph') response = await fetchAllWeeksSurveyScore(authData.id);

        if (response.success) {
          const chartData = response.data.map((item) => {
            const startDate = new Date(item.startDate);
            const endDate = new Date(item.endDate);
            const startDay = startDate.getUTCDate();
            const endDay = endDate.getUTCDate();
            const monthNames = [
              'Jan',
              'Feb',
              'Mar',
              'Apr',
              'May',
              'Jun',
              'Jul',
              'Aug',
              'Sep',
              'Oct',
              'Nov',
              'Dec',
            ];
            const month = monthNames[startDate.getMonth()];
            const label = `${month} ${startDay}-${endDay}`;
            const value = item.totalScore;

            return { value, label };
          });

          setData(chartData);
        } else {
          console.error('Error fetching data:', response.message);
        }
      } catch (error) {
        console.error('An error occurred while fetching survey scores:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [authData.id]);

  return { data, loading };
};
