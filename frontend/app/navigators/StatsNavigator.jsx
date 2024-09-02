import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

// Colors
import colors from '../constants/colors';
// Fonts
import fonts from '../constants/fonts';
// Icons
import { FontAwesome5 } from '@expo/vector-icons';

// Screens
import Calendar from '../screens/stats/Calendar';
import Graph from '../screens/stats/Graph';

// Navigation
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
const Tab = createMaterialTopTabNavigator();

// Header Height
import { headerHEIGHT, HEIGHT } from '../constants/dimensions';

const navigatorOptions = ({ route }) => {
  const mainColor = colors.blue300;
  return {
    swipeEnabled: false,
    tabBarStyle: {
      backgroundColor: colors.blue900,
    },
    tabBarIndicatorStyle: {
      backgroundColor: mainColor,
      height: 2,
    },
    tabBarLabel: ({ focused }) => {
      const color = focused ? mainColor : colors.blue600;
      const iconName = route.name === 'Calendar' ? 'calendar-day' : 'chart-bar';
      const IconComponent = FontAwesome5;
      return (
        <View style={{ flexDirection: 'row' }}>
          <IconComponent name={iconName} size={20} color={color} />
          <Text style={[styles.tabBarLabel, { color }]}>{route.name}</Text>
        </View>
      );
    },
  };
};

export default function StatsNavigator() {
  return (
    <View style={styles.container}>
      <Tab.Navigator
        initialRouteName="Calendar"
        screenOptions={navigatorOptions}
        style={{ top: headerHEIGHT }}
      >
        <Tab.Screen name="Calendar" component={Calendar} />
        <Tab.Screen name="Graph" component={Graph} />
      </Tab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: HEIGHT - headerHEIGHT,
    width: '100%',
    backgroundColor: colors.blue900,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBarLabel: {
    marginLeft: '10%',
    fontSize: 16,
    fontFamily: fonts.medium,
  },
});
