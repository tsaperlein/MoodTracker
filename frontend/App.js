import React from 'react';
import { StyleSheet } from 'react-native';

import * as Linking from 'expo-linking';

// Screens
import Splashscreen from './app/screens/extras/Splashscreen';
import PasswordReset from './screens/PasswordReset';

// Navigation
import { NavigationContainer } from '@react-navigation/native';
import StartNavigator from './app/navigators/StartNavigator';

// Authorization Services
import { AuthProvider } from 'context/AuthContext';
// Mood Services
import { MoodProvider } from 'context/MoodContext';
// Profile Services
import { ProfileProvider } from 'context/ProfileContext';

// Controller
import { useAppController } from './app/controllers/appController';

export default function App() {
  const splashScreenLoading = useAppController();

  // Set up deep linking configuration
  const linking = {
    prefixes: ['exp://jg2amui-tsaperlein-8081.exp.direct'],
    config: {
      screens: {
        PasswordReset: {
          path: 'reset-password/:token',
        },
      },
    },
  };

  return (
    <AuthProvider>
      <MoodProvider>
        <ProfileProvider>
          <NavigationContainer linking={linking}>
            {splashScreenLoading ? <Splashscreen /> : <StartNavigator />}
          </NavigationContainer>
        </ProfileProvider>
      </MoodProvider>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({});
