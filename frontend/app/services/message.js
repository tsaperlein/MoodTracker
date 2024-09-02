import { PRIVATE_API_URL } from '@env';

export async function fetchMessageByLevel(level) {
  try {
    const response = await fetch(`${PRIVATE_API_URL}/message/${level}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (response.ok) {
      return { success: true, data };
    } else {
      return { success: false, message: data.message || 'Failed to fetch quote' };
    }
  } catch (error) {
    console.error('Network Error:', error);
    return { success: false, message: 'An error occurred while fetching the quote' };
  }
}
