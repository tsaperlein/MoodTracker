import React from 'react';
import { StyleSheet } from 'react-native';

// Navigation
import { NavigationContainer } from '@react-navigation/native';
import StartNavigator from './app/navigators/StartNavigator';

// Authorization Services
import { AuthProvider } from 'context/AuthContext';

import { MoodProvider } from 'context/MoodContext';

// Controller
import { useAppController } from './app/controllers/appController';
import Splashscreen from './app/screens/extras/Splashscreen';

export default function App() {
  const splashScreenLoading = useAppController();

  return (
    <AuthProvider>
      <MoodProvider>
        <NavigationContainer>
          {splashScreenLoading ? <Splashscreen /> : <StartNavigator />}
        </NavigationContainer>
      </MoodProvider>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({});
