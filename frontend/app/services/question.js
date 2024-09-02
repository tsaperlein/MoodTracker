import { PRIVATE_API_URL } from '@env';

async function fetchSurveyQuestions(userId, surveyId) {
  console.log('Fetching the questions for the specified survey ...');
  try {
    const response = await fetch(
      `${PRIVATE_API_URL}/users/${userId}/survey/${surveyId}/get-questions`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const data = await response.json();

    if (response.ok) {
      return { success: true, questions: data.questions };
    } else {
      return { success: false, message: data.message || 'Failed to fetch survey questions' };
    }
  } catch (error) {
    console.error('Network Error:', error);
    return { success: false, message: 'An error occurred while fetching survey questions' };
  }
}

export { fetchSurveyQuestions };
