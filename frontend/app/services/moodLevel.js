import { PRIVATE_API_URL } from '@env';

export async function fetchUserMoodLevel(userId) {
  console.log('Fetching the answers of latest surveys and scores ...');
  try {
    const response = await fetch(`${PRIVATE_API_URL}/users/${userId}/find-mood-level`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (response.ok) {
      return { success: true, moodLevel: data.moodLevel };
    } else {
      return { success: false, message: data.message || 'Failed to fetch surveys and scores' };
    }
  } catch (error) {
    console.error('Network Error:', error);
    return { success: false, message: 'An error occurred while fetching surveys and scores' };
  }
}
