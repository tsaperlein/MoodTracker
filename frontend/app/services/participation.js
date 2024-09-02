import { PRIVATE_API_URL } from '@env';

export async function fetchUserParticipation(userId) {
  console.log('Fetching user participation percentage...');
  try {
    const response = await fetch(`${PRIVATE_API_URL}/users/${userId}/get-participation`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (response.ok) {
      return data.participation;
    } else {
      return { success: false, message: data.message || 'Failed to fetch participation data' };
    }
  } catch (error) {
    console.error('Network Error:', error);
    return { success: false, message: 'An error occurred while fetching participation data' };
  }
}
