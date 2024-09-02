import { PRIVATE_API_URL } from '@env';

export async function updateSurveyAnswers(userId, surveyId, answers) {
  try {
    const response = await fetch(`${PRIVATE_API_URL}/users/${userId}/daily-survey/update-answers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ survey_id: surveyId, answers }),
    });

    const data = await response.json();

    if (response.ok) {
      return { success: true };
    } else {
      return { success: false, message: data.message || 'Failed to update survey answers' };
    }
  } catch (error) {
    console.error('Network Error:', error);
    return { success: false, message: 'An error occurred while updating survey answers' };
  }
}

export async function fetchSurveyAnswers(userId, surveyId) {
  console.log('Fetching the answers of the survey ...');
  try {
    const response = await fetch(
      `${PRIVATE_API_URL}/users/${userId}/survey/${surveyId}/get-answers`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const data = await response.json();

    if (response.ok) {
      return { success: true, answers: data.answers };
    } else {
      return { success: false, message: data.message || 'Failed to fetch survey answers' };
    }
  } catch (error) {
    console.error('Network Error:', error);
    return { success: false, message: 'An error occurred while fetching survey answers' };
  }
}

export async function isSurveyFinished(surveyId) {
  console.log('Checking if the survey is finished ...');
  try {
    const response = await fetch(`${PRIVATE_API_URL}/surveys/${surveyId}/check-status`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (response.ok) {
      return { success: true, finished: data.finished };
    } else {
      return {
        success: false,
        message: data.message || 'Failed to check if the survey is finished',
      };
    }
  } catch (error) {
    console.error('Network Error:', error);
    return { success: false, message: 'An error occurred while fetching previous surveys' };
  }
}
