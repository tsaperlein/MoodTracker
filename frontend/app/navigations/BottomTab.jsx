import { View, Text, StyleSheet, Platform } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Courses from '../screens/Courses';
import Journal from '../screens/Journal';
import Settings from '../screens/Settings';
import Profile from '../screens/Profile';

import { FontAwesome6, Feather, MaterialCommunityIcons } from '@expo/vector-icons';

const BottomTabNavigator = createBottomTabNavigator();

export default function BottomTab() {
  //   const tabBarHeight = useBottomTabBarHeight();
  return (
    <BottomTabNavigator.Navigator
      screenOptions={{
        tabBarLabelStyle: styles.label,
        tabBarStyle: [
          styles.tabContainer,
          Platform.OS === 'ios' && {
            shadowOffset: { height: -2, width: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 15,
          },
        ],
        tabBarInactiveTintColor: 'gray',
        tabBarActiveTintColor: '#0071ff',
        tabBarShowLabel: false,
      }}
      safeAreaInsets={{
        bottom: 0,
      }}
    >
      <BottomTabNavigator.Screen
        name="courses"
        component={Courses}
        options={{
          tabBarIcon: ({ focused }) => (
            <FontAwesome6 name="book-open" size={24} color={focused ? '#0071ff' : 'gray'} />
          ),
        }}
      />
      <BottomTabNavigator.Screen
        name="journal"
        component={Journal}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="notebook"
              size={24}
              color={focused ? '#0071ff' : 'gray'}
            />
          ),
        }}
      />
      <BottomTabNavigator.Screen
        name="settings"
        component={Settings}
        options={{
          tabBarIcon: ({ focused }) => (
            <Feather name="settings" size={24} color={focused ? '#0071ff' : 'gray'} />
          ),
        }}
      />
      <BottomTabNavigator.Screen
        name="profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => (
            <FontAwesome6 name="user" size={22} color={focused ? '#0071ff' : 'gray'} />
          ),
        }}
      />
    </BottomTabNavigator.Navigator>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    position: 'absolute',
    width: '90%',
    borderRadius: 12,
    left: '5%',
    bottom: 20,
    backgroundColor: 'black',
    height: 80,
  },
  label: {
    textTransform: 'capitalize',
    fontSize: 12,
  },
});
