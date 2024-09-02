import React, { useContext, useState, useEffect } from 'react';

// Colors
import colors from '../constants/colors';

// Authorization Services
import { AuthContext } from 'context/AuthContext';
// Answer Services
import { isSurveyFinished } from 'services/answer';
// Survey Services
import { fetchLatestSurvey } from 'services/survey';
// User Services
import { fetchStreakCount } from 'services/user';

export const useHeaderTitleController = () => {
  const { authData } = useContext(AuthContext);
  const [dailySurveyCompleted, setDailySurveyCompleted] = useState(false);
  const [streakCount, setStreakCount] = useState(null);

  useEffect(() => {
    async function checkSurveyStatus() {
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

        if (typeof finished !== 'boolean') {
          setDailySurveyCompleted(false);
          return;
        }

        setDailySurveyCompleted(finished);
      } catch (error) {
        console.error('An error occurred while checking the survey status:', error);
        setDailySurveyCompleted(false);
      }
    }

    async function fetchStreak() {
      if (authData) {
        try {
          const result = await fetchStreakCount(authData.id);
          if (result.success) {
            setStreakCount(result.totalStreak);
          } else {
            console.error(result.message);
          }
        } catch (error) {
          console.error('An error occurred while fetching the streak count:', error);
        }
      }
    }

    if (authData) {
      checkSurveyStatus();
      fetchStreak();
    }
  }, [authData]);

  const [iconName, setIconName] = useState('calendar-times');
  const [iconColor, setIconColor] = useState(colors.gray700);
  const [backgroundColor, setBackgroundColor] = useState(colors.gray300);

  const [streakText, setStreakText] = useState('Loading...');
  const [streakContainerBackground, setStreakContainerBackground] = useState(colors.blue700);
  const [streakTextColor, setStreakTextColor] = useState(colors.blue200);
  const [streakIconColor, setStreakIconColor] = useState(colors.blue200);
  const [streakIcon, setStreakIcon] = useState('trophy');

  useEffect(() => {
    // Determine icon and background color based on survey status
    setIconName(dailySurveyCompleted ? 'calendar-check' : 'calendar-times');
    setIconColor(dailySurveyCompleted ? colors.blue200 : colors.gray700);
    setBackgroundColor(dailySurveyCompleted ? colors.blue700 : colors.gray400);

    // Determine streak-related styles
    const updatedStreakText =
      streakCount !== null ? `${streakCount} ${streakCount === 1 ? 'Day' : 'Days'}` : 'Loading...';
    setStreakText(updatedStreakText);

    const updatedStreakContainerBackground =
      streakCount >= 7 ? colors.yellow600 : streakCount === 0 ? colors.red400a50 : colors.blue700;
    setStreakContainerBackground(updatedStreakContainerBackground);

    const updatedStreakTextColor =
      streakCount >= 7 ? colors.yellow200 : streakCount === 0 ? colors.red700 : colors.blue200;
    setStreakTextColor(updatedStreakTextColor);

    const updatedStreakIconColor =
      streakCount >= 7 ? colors.yellow200 : streakCount === 0 ? colors.red700 : colors.blue200;
    setStreakIconColor(updatedStreakIconColor);

    setStreakIcon(streakCount === 0 ? 'trophy-broken' : 'trophy');
  }, [dailySurveyCompleted, streakCount]);

  return {
    authData,
    iconName,
    iconColor,
    backgroundColor,
    streakText,
    streakContainerBackground,
    streakTextColor,
    streakIconColor,
    streakIcon,
  };
};
