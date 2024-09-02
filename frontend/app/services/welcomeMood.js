import { PRIVATE_API_URL } from '@env';

async function fetchAllWelcomeMoods(userId) {
  console.log('Fetching all welcome moods of a specific user ...');
  try {
    const response = await fetch(`${PRIVATE_API_URL}/users/${userId}/get-welcome-moods`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (response.ok) {
      return {
        success: true,
        data,
      };
    } else {
      return { success: false, message: data.message || 'Failed to fetch the welcome moods' };
    }
  } catch (error) {
    console.error('Network Error:', error);
    return { success: false, message: 'An error occurred while fetching the welcome moods' };
  }
}
async function fetchLatestWeekWelcomeMoods(userId) {
  console.log('Fetching latest welcome mood of a specific user ...');
  try {
    const response = await fetch(
      `${PRIVATE_API_URL}/users/${userId}/get-latest-week-welcome-moods`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const data = await response.json();
    if (response.ok) {
      return {
        success: true,
        data,
      };
    } else {
      return {
        success: false,
        message: data.message || 'Failed to fetch the latest week welcome moods',
      };
    }
  } catch (error) {
    console.error('Network Error:', error);
    return {
      success: false,
      message: 'An error occurred while fetching the latest week welcome moods',
    };
  }
}

async function fetchLatestWelcomeMood(userId) {
  console.log('Fetching latest welcome mood of a specific user ...');
  try {
    const response = await fetch(`${PRIVATE_API_URL}/users/${userId}/get-latest-welcome-mood`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (response.ok) {
      return {
        success: true,
        data,
      };
    } else {
      return { success: false, message: data.message || 'Failed to fetch the latest welcome mood' };
    }
  } catch (error) {
    console.error('Network Error:', error);
    return { success: false, message: 'An error occurred while fetching the latest welcome mood' };
  }
}

async function submitWelcomeMood(userId, moodType) {
  console.log('Submitting welcome mood...');
  try {
    const response = await fetch(`${PRIVATE_API_URL}/users/${userId}/submit-welcome-mood`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ mood_type: moodType }),
    });

    const data = await response.json();

    if (response.ok) {
      return {
        success: true,
        data,
      };
    } else {
      return { success: false, message: data.message || 'Failed to submit the welcome mood' };
    }
  } catch (error) {
    console.error('Network Error:', error);
    return { success: false, message: 'An error occurred while submitting the welcome mood' };
  }
}

export {
  fetchAllWelcomeMoods,
  fetchLatestWeekWelcomeMoods,
  fetchLatestWelcomeMood,
  submitWelcomeMood,
};
