import React from 'react';
import { StyleSheet, View, Text, Dimensions, Platform } from 'react-native';

// Colors
import colors from '../config/colors';

// Screens
import SignIn from '../screens/start/SignIn';
import SignUp from '../screens/start/SignUp';

// Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

// Navigator Components
import MainNavigator from './MainNavigator';

// Header Height
const headerHEIGHT = (Dimensions.get('window').height * 12) / 100;

// Header Options
const headerOptions = {
  headerTitle: () => (
    <View style={{ justifyContent: 'center' }}>
      <Text style={styles.appName}>Mood Tracker</Text>
    </View>
  ),
  headerTransparent: true,
  headerStyle: {
    height: headerHEIGHT,
    borderBottomWidth: 0,
  },
  headerBackVisible: false,
};

export default function StartNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Sign In" screenOptions={headerOptions}>
        <Stack.Screen name="Sign In" component={SignIn} />
        <Stack.Screen name="Sign Up" component={SignUp} />
        <Stack.Screen
          name="Main Navigator"
          component={MainNavigator}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  appName: {
    color: colors.blue600,
    fontSize: 32,
    fontFamily: Platform.OS === 'ios' ? 'outfitBold' : 'robotoBold',
  },
});
