import React, { createContext, useState, useEffect } from 'react';

// Async Storage
import AsyncStorage from '@react-native-async-storage/async-storage';

// Notifications
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import Constants from 'expo-constants';

// Screens
import Connecting from '../screens/extras/Connecting';

// Sign In - Sign Up Services
import { handleSignIn, handleSignUp } from 'services/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [connecting, setConnecting] = useState(false);

  // Function to load session data from AsyncStorage
  const loadSession = async () => {
    try {
      const authDataSerialized = await AsyncStorage.getItem('@AuthData');
      if (authDataSerialized) {
        const _authData = JSON.parse(authDataSerialized);
        setAuthData(_authData);
      }
    } catch (error) {
      console.error('Failed to load session:', error);
    } finally {
      setLoading(false);
    }
  };

  // Effect to load session data on app load
  useEffect(() => {
    loadSession();
  }, []);

  // Function to register for push notifications and get the token
  const registerForPushNotificationsAsync = async () => {
    let token;
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      // Get the Expo push token
      token = (
        await Notifications.getExpoPushTokenAsync({
          projectId: Constants.expoConfig.extra.eas.projectId,
        })
      ).data;
    } else {
      alert('Must use a physical device for Push Notifications');
    }

    console.log(token);
    return token;
  };

  // Function to handle sign in
  const signIn = async (email, password) => {
    try {
      const result = await handleSignIn(email, password);
      if (result && result.data) {
        setAuthData(result.data);
        await AsyncStorage.setItem('@AuthData', JSON.stringify(result.data));
        await AsyncStorage.setItem('@AuthToken', result.data.authToken);
        setConnecting(true);
      } else {
        throw new Error('No auth data returned from sign in');
      }
    } catch (error) {
      throw error;
    } finally {
      setTimeout(() => {
        setConnecting(false);
      }, 4000);
    }
  };

  // Function to handle sign up
  const signUp = async (firstName, lastName, email, password) => {
    try {
      const pushNotificationToken = await registerForPushNotificationsAsync();
      if (pushNotificationToken) {
        const result = await handleSignUp(
          firstName,
          lastName,
          email,
          password,
          pushNotificationToken
        );
        setConnecting(true);
        if (result.success) {
          setAuthData(result.data);
          await AsyncStorage.setItem('@AuthData', JSON.stringify(result.data));
          await AsyncStorage.setItem('@AuthToken', result.data.authToken);
        } else {
          throw new Error(result.message);
        }
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      throw error;
    } finally {
      setTimeout(() => {
        setConnecting(false);
      }, 4000);
    }
  };

  // Function to handle sign out
  const signOut = async () => {
    try {
      setAuthData(null);
      await AsyncStorage.multiRemove(['@AuthData', '@AuthToken']);
    } catch (error) {
      console.error('Failed to sign out:', error);
    }
  };

  if (connecting) return <Connecting />;

  return (
    <AuthContext.Provider
      value={{
        authData,
        loading,
        loadSession,
        signIn,
        signUp,
        signOut,
        setAuthData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
