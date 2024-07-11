import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

// Screens
import Calendar from '../screens/stats/Calendar';
import Graph from '../screens/stats/Graph';

// Colors
import colors from '../config/colors';
// Icons
import { FontAwesome6 } from '@expo/vector-icons';

// Navigation
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
const Tab = createMaterialTopTabNavigator();

const navigatorOptions = ({ route }) => {
  const mainColor = colors.blue900;
  return {
    swipeEnabled: false,
    tabBarStyle: { backgroundColor: colors.blue400 },
    tabBarIndicatorStyle: { backgroundColor: mainColor },
    tabBarLabel: ({ focused }) => {
      const color = focused ? mainColor : colors.blue200;
      const iconName = route.name === 'Calendar' ? 'calendar-day' : 'bar-chart';
      const IconComponent = FontAwesome6;
      return (
        <View style={{ flexDirection: 'row' }}>
          <IconComponent name={iconName} size={20} color={color} />
          <Text style={[styles.tabBarLabel, { color }]}>{route.name}</Text>
        </View>
      );
    },
  };
};

const StatsNavigator = () => {
  return (
    <Tab.Navigator initialRouteName="Calendar" screenOptions={navigatorOptions}>
      <Tab.Screen name="Calendar" component={Calendar} />
      <Tab.Screen name="Graph" component={Graph} />
    </Tab.Navigator>
  );
};

export default StatsNavigator;

const styles = StyleSheet.create({
  tabBarLabel: {
    marginLeft: '10%',
    fontSize: 16,
    fontFamily: 'outfitMedium',
  },
});
