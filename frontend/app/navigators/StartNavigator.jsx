import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';

// Colors
import colors from '../constants/colors';
// Fonts
import fonts from '../constants/fonts';

// Screens
import SignIn from '../screens/start/SignIn';
import SignUp from '../screens/start/SignUp';
import RequestPasswordReset from '../screens/password/RequestPasswordReset';
import PasswordReset from '../screens/password/PasswordReset';
import Welcome from '../screens/start/Welcome';
import Connecting from '../screens/extras/Connecting';

// Components
import FlashMessage, { showMessage } from 'react-native-flash-message';

// Main Navigator
import MainNavigator from './MainNavigator';

// Navigation
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

// Authorization Services
import { useAuth } from 'context/AuthContext';
// Mood Services
import { useMood } from 'context/MoodContext';

export default function StartNavigator() {
  const { authData } = useAuth();
  const { hasChosenMood, checkMoodStatus } = useMood();

  const [showConnecting, setShowConnecting] = useState(false);
  const [appNameColor, setAppNameColor] = useState(colors.blue600);

  useEffect(() => {
    if (authData) {
      const handleMoodCheck = async () => {
        setShowConnecting(true);
        await checkMoodStatus();
        setTimeout(() => {
          setShowConnecting(false);
        }, 3000);
      };

      handleMoodCheck();
    }
  }, [authData ? authData.id : authData]);

  if (showConnecting) {
    return <Connecting />;
  }

  return (
    <View style={{ flex: 1 }}>
      <Stack.Navigator
        screenOptions={{
          headerTitleAlign: 'center',
          headerTitle: () => (
            <View style={{ justifyContent: 'center' }}>
              <Text style={[styles.appName, { color: appNameColor }]}>Mood Tracker</Text>
            </View>
          ),
          headerTransparent: true,
          headerBackVisible: false,
        }}
      >
        {authData ? (
          hasChosenMood ? (
            <Stack.Screen
              name="Main Navigator"
              component={MainNavigator}
              options={{ headerShown: false }}
            />
          ) : (
            <Stack.Screen name="Welcome">
              {(props) => <Welcome {...props} setAppNameColor={setAppNameColor} />}
            </Stack.Screen>
          )
        ) : (
          <>
            <Stack.Screen name="Sign In">
              {(props) => <SignIn {...props} showMessage={showMessage} />}
            </Stack.Screen>
            <Stack.Screen name="Sign Up">
              {(props) => <SignUp {...props} showMessage={showMessage} />}
            </Stack.Screen>
            <Stack.Screen
              name="RequestPasswordReset"
              component={RequestPasswordReset}
              options={{ headerBackVisible: true, headerBackTitleVisible: false }}
            />
            <Stack.Screen
              name="PasswordReset"
              component={PasswordReset}
              options={{ headerBackVisible: true, headerBackTitleVisible: false }}
            />
          </>
        )}
      </Stack.Navigator>
      <FlashMessage position="top" />
    </View>
  );
}

const styles = StyleSheet.create({
  appName: {
    color: colors.blue600,
    fontSize: 32,
    fontFamily: fonts.bold,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.blue500,
  },
});
