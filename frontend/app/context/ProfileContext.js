import React, { createContext, useState, useContext, useEffect } from 'react';
import { Text } from 'react-native';

// Components
import { showMessage } from 'react-native-flash-message';

// Async Storage
import AsyncStorage from '@react-native-async-storage/async-storage';

// User Services
import { updateUserInfo } from 'services/user';

// Authorization Services
import { useAuth } from 'context/AuthContext';

export const ProfileContext = createContext();
export const useProfile = () => useContext(ProfileContext);

export const ProfileProvider = ({ children }) => {
  const { authData, setAuthData } = useAuth();

  const [loading, setLoading] = useState(true);
  const [isChanged, setIsChanged] = useState(false);
  const [editFinished, setEditFinished] = useState(false);

  // Form state to hold user profile changes
  const [formState, setFormState] = useState({
    first_name: '',
    last_name: '',
    email: '',
  });

  // Original state to track changes compared to initial form state
  const [originalState, setOriginalState] = useState(formState);

  // Handle the case when authData is still null or undefined
  useEffect(() => {
    if (authData) {
      // Populate formState with authData once it is available
      setFormState({
        first_name: authData.first_name || '',
        last_name: authData.last_name || '',
        email: authData.email || '',
      });
      setOriginalState({
        first_name: authData.first_name || '',
        last_name: authData.last_name || '',
        email: authData.email || '',
      });
      setLoading(false); // Stop loading once the data is populated
    } else {
      // Handle the case when authData is not available
      setLoading(false); // Stop loading even if authData is not available
    }
  }, [authData]);

  // Track if the formState is different from the originalState
  useEffect(() => {
    const hasChanged =
      originalState.first_name !== formState.first_name ||
      originalState.last_name !== formState.last_name ||
      originalState.email !== formState.email;

    setIsChanged(hasChanged);
    setEditFinished(false);
  }, [formState, originalState]);

  // Function to save profile changes
  const handleSaveChanges = async () => {
    if (!formState.email) return; // Prevent saving with empty data

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formState.email)) {
      showMessage({
        message: 'Invalid Email',
        description: 'Please enter a valid email address before saving.',
        type: 'danger',
      });
      return;
    }

    if (!authData) {
      showMessage({
        message: 'Error',
        description: 'User is not authenticated.',
        type: 'danger',
      });
      return;
    }

    const result = await updateUserInfo(authData.id, formState);

    if (result.success) {
      showMessage({
        message: 'Success',
        description: 'User information updated successfully.',
        type: 'success',
      });

      // Update the originalState and authData after successful save
      setOriginalState(formState); // Set original state to current state after save
      const updatedAuthData = { ...authData, ...formState };
      setAuthData(updatedAuthData);

      try {
        await AsyncStorage.setItem('@AuthData', JSON.stringify(updatedAuthData));
      } catch (error) {
        console.error('Failed to save authData to AsyncStorage:', error);
      }

      setEditFinished(true);
    } else {
      showMessage({
        message: 'Error',
        description: result.message,
        type: 'danger',
      });
      console.error('Error updating user information:', result.message);
    }
  };

  return (
    <ProfileContext.Provider
      value={{ isChanged, handleSaveChanges, formState, setFormState, editFinished }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
