import { useState, useEffect, useCallback } from 'react';
import { Animated } from 'react-native';

// Authorization services
import { useAuth } from 'context/AuthContext';
// Survey Services
import { fetchPreviousSurveys } from 'services/survey';

// Window height
import { HEIGHT } from '../constants/dimensions';

export default function useQuestionnairesController() {
  const { authData } = useAuth();

  const scrollY = useState(new Animated.Value(0))[0];
  const [surveys, setSurveys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchAndSetSurveys = async () => {
    try {
      setRefreshing(true);
      setLoading(true);
      const result = await fetchPreviousSurveys(authData.id);

      if (result.success) {
        const sortedSurveys = result.surveys
          .sort((a, b) => b.surveyId - a.surveyId)
          .map((group) => {
            const sortedVersions = group.versions.sort(
              (a, b) => new Date(b.completion_time) - new Date(a.completion_time)
            );
            return {
              ...group,
              versions: sortedVersions,
            };
          });

        setSurveys(sortedSurveys);
      }
    } catch (error) {
      console.error('Failed to fetch surveys:', error);
    } finally {
      setRefreshing(false);
      setLoading(false);
    }
  };

  const onRefresh = useCallback(async () => {
    await fetchAndSetSurveys();
  }, [authData]);

  useEffect(() => {
    fetchAndSetSurveys();
  }, [authData]);

  // Determine the output range based on the screen height
  const outputRange = HEIGHT < 800 ? ['30%', '15%'] : ['25%', '10%'];

  // Assuming scrollY is an Animated.Value, create the height interpolation
  const height = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: outputRange,
    extrapolate: 'clamp',
  });

  const marginBottom = scrollY.interpolate({
    inputRange: [0, 50],
    outputRange: ['3%', '0%'],
    extrapolate: 'clamp',
  });

  const width = scrollY.interpolate({
    inputRange: [0, 50],
    outputRange: ['90%', '100%'],
    extrapolate: 'clamp',
  });

  const borderRadius = scrollY.interpolate({
    inputRange: [0, 50],
    outputRange: [40, 0],
    extrapolate: 'clamp',
  });

  function formatDate(dateString, includeWeekday = false, omitSuffix = false) {
    const date = new Date(dateString);
    const options = { day: 'numeric', timeZone: 'UTC' };

    if (includeWeekday) {
      options.weekday = 'long';
    }

    let formattedDate = date.toLocaleDateString('en-US', options);
    const day = date.getUTCDate();

    if (!omitSuffix) {
      let daySuffix;
      if (day === 1 || day === 21 || day === 31) {
        daySuffix = 'st';
      } else if (day === 2 || day === 22) {
        daySuffix = 'nd';
      } else if (day === 3 || day === 23) {
        daySuffix = 'rd';
      } else {
        daySuffix = 'th';
      }

      formattedDate = formattedDate.replace(new RegExp(`\\b${day}\\b`), `${day}${daySuffix}`);
    }

    return formattedDate;
  }

  function formatDateToLongForm(dateString) {
    return formatDate(dateString, true);
  }

  // Utility function to calculate the time difference and format it
  const calculateTimeDifference = (postedAt, completionTime) => {
    const postedDate = new Date(postedAt);
    const completedDate = new Date(completionTime);
    const differenceInMilliseconds = completedDate - postedDate;

    if (isNaN(differenceInMilliseconds)) return 'Invalid date';

    const differenceInMinutes = Math.floor(differenceInMilliseconds / (1000 * 60));
    const differenceInHours = Math.floor(differenceInMinutes / 60);
    const differenceInDays = Math.floor(differenceInHours / 24);

    const minutes = differenceInMinutes % 60;
    const hours = differenceInHours % 24;
    const days = differenceInDays;

    let formattedDifference = '';

    if (days >= 7) {
      // 7 days or more, only show days
      formattedDifference = `${days}d`;
    } else if (days >= 1) {
      // 1 day or more, show days and hours, but not minutes
      formattedDifference = `${days}d`;
      if (hours > 0) {
        formattedDifference += ` ${hours}h`;
      }
    } else {
      // Less than 1 day, show hours and minutes
      if (hours > 0) {
        formattedDifference += `${hours}h `;
      }
      formattedDifference += `${minutes}m`;
    }

    return formattedDifference.trim();
  };

  function getSurveyGroupLabel(surveyGroup) {
    const dates = Array.from(
      new Set(
        surveyGroup.versions.map((survey) => {
          return new Date(survey.posted_at).toISOString().split('T')[0]; // YYYY-MM-DD
        })
      )
    ).map((dateString) => new Date(dateString));

    dates.sort((a, b) => a - b);

    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    const startDate = dates[0];
    const endDate = dates[dates.length - 1];

    const startMonth = monthNames[startDate.getUTCMonth()];
    const endMonth = monthNames[endDate.getUTCMonth()];

    // Check if the number of unique dates in the group is 1 or 2
    if (dates.length === 1 || dates.length === 2) {
      return `${startMonth} ${formatDate(startDate.toISOString(), false)} - ...`;
    }

    if (startDate.getUTCMonth() === endDate.getUTCMonth()) {
      return `${startMonth} ${formatDate(startDate.toISOString(), false)} - ${formatDate(endDate.toISOString(), false)}`;
    } else {
      return `${startMonth} ${formatDate(startDate.toISOString(), false)} - ${endMonth} ${formatDate(endDate.toISOString(), false)}`;
    }
  }

  return {
    scrollY,
    surveys,
    loading,
    height,
    marginBottom,
    width,
    borderRadius,
    formatDateToLongForm,
    calculateTimeDifference,
    getSurveyGroupLabel,
    refreshing,
    onRefresh,
  };
}
