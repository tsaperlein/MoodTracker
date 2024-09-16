import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, LogBox } from 'react-native';
LogBox.ignoreLogs([
  'Warning: Cannot update a component (`MoodBarChart`) while rendering a different component (`Animated2DWithGradient`)',
]);

// Colors
import colors from '../constants/colors';
// Fonts
import fonts from '../constants/fonts';
// Icons
import { MaterialIcons } from '@expo/vector-icons';

// Screens
import Profile from '../screens/main/Profile';

// Navigators
import BottomNavigator from './BottomNavigator';
import SurveyNavigator from './SurveyNavigator';
import StatsNavigator from './StatsNavigator';

// Components
import HeaderAvatar from '../components/HeaderAvatar';
import HeaderTitle from '../components/HeaderTitle';

// Navigation
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

// Profile Services
import { useProfile } from 'context/ProfileContext';

// Header Height
import { headerHEIGHT } from '../constants/dimensions';

const headerOptions = {
  headerTitle: () => <HeaderTitle />,
  headerRight: () => <HeaderAvatar />,
  headerTransparent: true,
  headerTitleAlign: 'center',
  headerStyle: {
    height: headerHEIGHT,
    borderBottomWidth: 0,
  },
  headerBackTitleVisible: false,
};

const StatsNavigatorOptions = {
  headerTitle: 'Statistics',
  headerTitleAlign: 'center',
  headerTransparent: true,
  headerStyle: {
    height: headerHEIGHT,
  },
  headerTitleStyle: {
    color: colors.blue300,
    fontFamily: fonts.bold,
    fontSize: 24,
  },
  headerBackTitleVisible: false,
  headerBackImage: () => (
    <MaterialIcons name="arrow-back-ios-new" size={30} color={colors.blue300} />
  ),
};

export default function MainNavigator() {
  const { isChanged, handleSaveChanges } = useProfile();

  const ProfileHeaderOptions = {
    headerTitle: 'Profile',
    headerTitleAlign: 'center',
    headerTransparent: true,
    headerStyle: {
      height: headerHEIGHT,
    },
    headerTitleStyle: {
      color: colors.blue300,
      fontFamily: fonts.bold,
      fontSize: 24,
    },
    headerBackTitleVisible: false,
    headerBackImage: () => (
      <MaterialIcons name="arrow-back-ios-new" size={30} color={colors.blue300} />
    ),
    headerRight: () => (
      <TouchableOpacity onPress={handleSaveChanges} disabled={!isChanged}>
        <Text style={[styles.doneButton, !isChanged && styles.disabledButton]}>Done</Text>
      </TouchableOpacity>
    ),
  };

  return (
    <View style={styles.container}>
      <Stack.Navigator initialRouteName="Bottom Navigator">
        <Stack.Screen name="Bottom Navigator" component={BottomNavigator} options={headerOptions} />
        <Stack.Screen
          name="Survey Navigator"
          component={SurveyNavigator}
          options={{ headerShown: false }}
          initialParams={{ mode: 'current' }}
        />
        <Stack.Screen
          name="Stats Navigator"
          component={StatsNavigator}
          options={StatsNavigatorOptions}
        />
        <Stack.Screen name="Profile" component={Profile} options={ProfileHeaderOptions} />
      </Stack.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: colors.blue900,
  },
  doneButton: {
    color: colors.blue400,
    fontSize: 18,
    fontFamily: fonts.medium,
    marginRight: '15%',
  },
  disabledButton: {
    color: colors.blue900,
  },
});
