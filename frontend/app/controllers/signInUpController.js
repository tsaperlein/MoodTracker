// Email Services
import { checkIfEmailExists } from 'services/user';

export const validateEmail = (email) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
};

export const onSignInPress = async (email, password, signIn, showMessage) => {
  if (!email || !password) {
    showMessage({
      message: 'Incomplete Fields',
      description: 'Please fill in both the email and password fields.',
      type: 'danger',
    });
    return;
  }

  if (!validateEmail(email)) {
    showMessage({
      message: 'Invalid Email',
      description: 'Please enter a valid email address.',
      type: 'danger',
    });
    return;
  }

  try {
    await signIn(email, password, () => checkMoodStatus());
  } catch (error) {
    showMessage({
      message: 'Invalid Password',
      description: 'Please enter a valid password',
      type: 'danger',
    });
  }
};

export const onSignUpPress = async (
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  signUp,
  showMessage,
  navigation
) => {
  if (!firstName || !lastName || !email || !password || !confirmPassword) {
    showMessage({
      message: 'Incomplete Fields',
      description: 'Please fill in all the fields.',
      type: 'danger',
    });
    return;
  }

  if (!validateEmail(email)) {
    showMessage({
      message: 'Invalid Email',
      description: 'Please enter a valid email address.',
      type: 'danger',
    });
    return;
  }

  if (password !== confirmPassword) {
    showMessage({
      message: 'Password Mismatch',
      description: 'The passwords do not match.',
      type: 'danger',
    });
    return;
  }

  try {
    const emailExists = await checkIfEmailExists(email);
    if (emailExists) {
      showMessage({
        message: 'Email Already Exists',
        description: 'An account with this email already exists.',
        type: 'danger',
      });
      return;
    }

    await signUp(firstName, lastName, email, password);
    showMessage({
      message: 'Account Created',
      description: 'Your account has been created successfully.',
      type: 'success',
    });

    navigation.replace('Sign In');
  } catch (error) {
    showMessage({
      message: 'Sign Up Error',
      description: error.message,
      type: 'danger',
    });
  }
};
