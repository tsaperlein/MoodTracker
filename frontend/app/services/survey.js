import { PRIVATE_API_URL } from '@env';

async function fetchLatestSurvey(userId) {
  console.log('Fetching the latest survey ...');
  try {
    const response = await fetch(`${PRIVATE_API_URL}/users/${userId}/latest-survey`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (response.ok) {
      return {
        success: true,
        id: data.id,
        surveyId: data.surveyId,
        version: data.version,
        postedAt: data.postedAt,
        completionTime: data.completion_time,
      };
    } else {
      return { success: false, message: data.message || 'Failed to fetch latest survey' };
    }
  } catch (error) {
    console.error('Network Error:', error);
    return { success: false, message: 'An error occurred while fetching latest survey' };
  }
}

async function fetchSurvey(userId, surveyId) {
  console.log('Fetching the survey ...');
  try {
    const response = await fetch(`${PRIVATE_API_URL}/users/${userId}/get-survey/${surveyId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (response.ok) {
      return {
        success: true,
        id: data.id,
        surveyId: data.surveyId,
        version: data.version,
        postedAt: data.postedAt,
        completionTime: data.completion_time,
      };
    } else {
      return { success: false, message: data.message || 'Failed to fetch latest survey' };
    }
  } catch (error) {
    console.error('Network Error:', error);
    return { success: false, message: 'An error occurred while fetching latest survey' };
  }
}

async function fetchPreviousSurveys(userId) {
  console.log('Fetching previous surveys ...');
  try {
    const response = await fetch(`${PRIVATE_API_URL}/users/${userId}/previous-surveys`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (response.ok) {
      return {
        success: true,
        surveys: data,
      };
    } else {
      return { success: false, message: data.message || 'Failed to fetch previous surveys' };
    }
  } catch (error) {
    console.error('Network Error:', error);
    return { success: false, message: 'An error occurred while fetching previous surveys' };
  }
}

async function isSurveyReadyForNextDay(userId) {
  console.log('Checking if the survey is ready for the next day ...');
  try {
    const response = await fetch(`${PRIVATE_API_URL}/users/${userId}/check-next-survey-status`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (response.ok) {
      return {
        success: true,
        status: data.status,
      };
    } else {
      return { success: false, message: data.message || 'Failed to fetch previous surveys' };
    }
  } catch (error) {
    console.error('Network Error:', error);
    return { success: false, message: 'An error occurred while fetching previous surveys' };
  }
}

export { fetchLatestSurvey, fetchSurvey, fetchPreviousSurveys, isSurveyReadyForNextDay };
