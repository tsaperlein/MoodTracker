import { PRIVATE_API_URL } from '@env';

export async function handleSignIn(email, password) {
  console.log(`${PRIVATE_API_URL}/auth/signin`);
  console.log('connected');
  try {
    const response = await fetch(`${PRIVATE_API_URL}/auth/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      return { success: true, data };
    } else {
      return { success: false, message: data.message || 'Invalid email or password' };
    }
  } catch (error) {
    console.error('Network Error:', error);
    return { success: false, message: 'An error occurred during sign in' };
  }
}

export async function handleSignUp(firstName, lastName, email, password, pushNotificationToken) {
  console.log('signed up');
  try {
    const response = await fetch(`${PRIVATE_API_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        email,
        password,
        pushNotificationToken,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      return { success: true, data };
    } else {
      return { success: false, message: data.message || 'Error creating account' };
    }
  } catch (error) {
    console.error('Network Error:', error);
    return { success: false, message: 'An error occurred during sign up' };
  }
}

// Service to request a password reset
export async function requestPasswordReset(email) {
  try {
    const response = await fetch(`${PRIVATE_API_URL}/auth/requestPasswordReset`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (response.ok) {
      return { success: true, message: 'Password reset email sent successfully' };
    } else {
      return { success: false, message: data.message || 'Error requesting password reset' };
    }
  } catch (error) {
    console.error('Network Error:', error);
    return { success: false, message: 'An error occurred during the password reset request' };
  }
}

// Service to reset the password using a token
export async function resetPassword(token, newPassword) {
  try {
    const response = await fetch(`${PRIVATE_API_URL}/auth/resetPassword`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token, newPassword }),
    });

    const data = await response.json();

    if (response.ok) {
      return { success: true, message: 'Password has been reset successfully' };
    } else {
      return { success: false, message: data.message || 'Error resetting password' };
    }
  } catch (error) {
    console.error('Network Error:', error);
    return { success: false, message: 'An error occurred during the password reset' };
  }
}
