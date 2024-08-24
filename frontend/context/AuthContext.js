import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Sign In - Sign Up Services
import { handleSignIn, handleSignUp } from 'services/auth';
import Connecting from '../app/screens/extras/Connecting';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [connecting, setConnecting] = useState(false);

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

  useEffect(() => {
    loadSession();
  }, []);

  if (connecting) return <Connecting />;

  const signIn = async (email, password) => {
    try {
      const result = await handleSignIn(email, password);
      if (result.success) {
        setAuthData(result.data);
        await AsyncStorage.setItem('@AuthData', JSON.stringify(result.data));
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      throw error;
    } finally {
      setTimeout(() => {
        setConnecting(false);
      }, 4000); // Keep the Connecting screen visible for 4000ms
    }
  };

  const signUp = async (firstName, lastName, email, password) => {
    try {
      const result = await handleSignUp(firstName, lastName, email, password);
      if (result.success) {
        setAuthData(result.data);
        await AsyncStorage.setItem('@AuthData', JSON.stringify(result.data));
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      throw error;
    } finally {
      setTimeout(() => {
        setConnecting(false);
      }, 4000); // Keep the Connecting screen visible for 4000ms
    }
  };

  const signOut = async () => {
    setAuthData(null);
    await AsyncStorage.removeItem('@AuthData');
  };

  return (
    <AuthContext.Provider
      value={{ authData, loading, loadSession, signIn, signUp, signOut, setAuthData }}
    >
      {children}
    </AuthContext.Provider>
  );
};
