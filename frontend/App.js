import React from 'react';
import { StyleSheet } from 'react-native';
import * as Linking from 'expo-linking';

// Screens
import Splashscreen from './app/screens/extras/Splashscreen';
import ResetPassword from './app/screens/password/RequestPasswordReset';

// Navigation
import { NavigationContainer } from '@react-navigation/native';
import StartNavigator from './app/navigators/StartNavigator';

// Authorization Services
import { AuthProvider } from 'context/AuthContext';
// Mood Services
import { MoodProvider } from 'context/MoodContext';
// Profile Services
import { ProfileProvider } from 'context/ProfileContext';
// Daily Survey Provider
import { DailySurveyProvider } from 'context/DailySurveyContext';

// Controller
import { useAppController } from './app/controllers/appController';

// Set up deep linking configuration
const linking = {
  prefixes: ['exp://jg2amui-tsaperlein-8081.exp.direct'],
  config: {
    screens: {
      ResetPassword: {
        path: 'reset-password/:token',
        parse: {
          token: (token) => `${token}`,
        },
      },
    },
  },
};

export default function App() {
  const splashScreenLoading = useAppController();

  return (
    <AuthProvider>
      <MoodProvider>
        <ProfileProvider>
          <DailySurveyProvider>
            <NavigationContainer linking={linking}>
              {splashScreenLoading ? <Splashscreen /> : <StartNavigator />}
            </NavigationContainer>
          </DailySurveyProvider>
        </ProfileProvider>
      </MoodProvider>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({});
