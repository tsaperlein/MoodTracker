import { PRIVATE_API_URL } from '@env';

import * as FileSystem from 'expo-file-system';

export async function updateUserInfo(userId, { first_name, last_name, email }) {
  console.log();
  try {
    const response = await fetch(`${PRIVATE_API_URL}/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        first_name,
        last_name,
        email,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Failed to update user information.');
    }

    return result; // Return the result object, which may include success message or updated user data
  } catch (error) {
    console.error('Error updating user information:', error);
    return { success: false, message: error.message }; // Return a consistent error object
  }
}

export async function updateUserImage(userId, imageUri) {
  try {
    // Read the image file as a base64 string, without any prefix
    const base64Image = await FileSystem.readAsStringAsync(imageUri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    // Send the Base64 image to the server
    const response = await fetch(`${PRIVATE_API_URL}/users/${userId}/update-image`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ base64Image }), // Send the base64 image directly
    });

    if (!response.ok) {
      console.error('Failed to update image:', response.statusText);
      throw new Error("Couldn't update the image");
    }

    const responseData = await response.json();

    // Check if the response contains a valid image URL
    if (responseData.success && responseData && responseData.imageUrl) {
      return {
        success: true,
        message: 'Image updated successfully',
        imageUrl: responseData.imageUrl,
      };
    } else {
      const errorMessage = responseData.message || 'Invalid server response';
      console.error('Error processing server response:', errorMessage);
      throw new Error(errorMessage);
    }
  } catch (error) {
    console.error('Error:', error.message);
    return {
      success: false,
      message: 'An error occurred while updating the user image: ' + error.message,
    };
  }
}

export async function deleteUserImage(userId) {
  try {
    const response = await fetch(`${PRIVATE_API_URL}/users/${userId}/delete-image`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error("Couldn't delete the user image");
    }

    return { success: true };
  } catch (error) {
    console.error('Network Error:', error.message);
    return {
      success: false,
      message: 'An error occurred while deleting user image: ' + error.message,
    };
  }
}

export async function checkIfEmailExists(email) {
  try {
    const response = await fetch(`${PRIVATE_API_URL}/users/email/${email}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error("Couldn't check email existence");
    }

    const { exists } = await response.json();
    return exists;
  } catch (error) {
    console.error('Error:', error.message);
    throw new Error('An error occurred while checking if the email exists: ' + error.message);
  }
}

export async function fetchUserAvatar(userId) {
  try {
    const response = await fetch(`${PRIVATE_API_URL}/users/${userId}/image`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();

    if (data.success && data.imageUrl) {
      return data.imageUrl;
    } else if (data.message === 'User Image not found') {
      return null;
    } else {
      throw new Error(`Failed to fetch user avatar: ${data.message || 'Unknown error'}`);
    }
  } catch (error) {
    console.error('Error fetching user avatar:', error.message);
    throw new Error('An error occurred while fetching the user avatar: ' + error.message);
  }
}

export async function fetchStreakCount(userId) {
  console.log('Fetching the streak count of the user ...');
  try {
    const response = await fetch(`${PRIVATE_API_URL}/users/${userId}/get-streak-count`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (response.ok) {
      return { success: true, totalStreak: data.totalStreak };
    } else {
      return { success: false, message: data.message || 'Failed to fetch surveys and scores' };
    }
  } catch (error) {
    console.error('Network Error:', error);
    return { success: false, message: 'An error occurred while fetching surveys and scores' };
  }
}
