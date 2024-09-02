import { PRIVATE_API_URL } from '@env';

export async function fetchLatestWeekSurveyScore(userId) {
  console.log("Fetching the latest week's survey score ...");
  try {
    const response = await fetch(
      `${PRIVATE_API_URL}/users/${userId}/get-latest-surveys-and-scores`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const data = await response.json();

    if (response.ok) {
      return { success: true, data: data.results };
    } else {
      return { success: false, message: data.message || 'Failed to fetch surveys and scores' };
    }
  } catch (error) {
    console.error('Network Error:', error);
    return { success: false, message: 'An error occurred while fetching surveys and scores' };
  }
}

export async function fetchAllWeeksSurveyScore(userId) {
  console.log('Fetching the all survey scores ...');
  try {
    const response = await fetch(`${PRIVATE_API_URL}/users/${userId}/get-all-surveys-and-scores`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (response.ok) {
      return { success: true, data: data.results };
    } else {
      return { success: false, message: data.message || 'Failed to fetch surveys and scores' };
    }
  } catch (error) {
    console.error('Network Error:', error);
    return { success: false, message: 'An error occurred while fetching surveys and scores' };
  }
}

export async function fetchSurveyVersionScore(surveyId) {
  console.log('Fetching the score of a suvery ...');
  try {
    const response = await fetch(`${PRIVATE_API_URL}/survey/${surveyId}/get-score`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (response.ok) {
      return { success: true, score: data.versionScore };
    } else {
      return { success: false, message: data.message || 'Failed to fetch surveys and scores' };
    }
  } catch (error) {
    console.error('Network Error:', error);
    return { success: false, message: 'An error occurred while fetching surveys and scores' };
  }
}
