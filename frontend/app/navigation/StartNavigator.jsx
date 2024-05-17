import React from 'react';
import { StyleSheet, View, Text, Dimensions, Platform } from 'react-native';

// Colors
import colors from '../config/colors';

// Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

// Screens
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';

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
      <Stack.Navigator initialRouteName="SignIn" screenOptions={headerOptions}>
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
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
