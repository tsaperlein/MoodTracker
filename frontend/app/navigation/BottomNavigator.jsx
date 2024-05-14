import { View, Text, StyleSheet, Platform } from 'react-native';
import React from 'react';

// Colors
import colors from '../config/colors';
// Icons
import { Ionicons, FontAwesome6, MaterialCommunityIcons } from '@expo/vector-icons';
// Screens
import Home from '../screens/Home';
import Questionnaires from '../screens/Questionnaires';
import AddNote from '../screens/AddNote';
import Diary from '../screens/Diary';
import Statistics from '../screens/Statistics';

// Bottom Navigation
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const BottomTabNavigator = createBottomTabNavigator();

const getIconComponent = (iconLibrary) => {
  switch (iconLibrary) {
    case 'FontAwesome6':
      return FontAwesome6;
    case 'Ionicons':
      return Ionicons;
    case 'MaterialCommunityIcons':
      return MaterialCommunityIcons;
    default:
      return MaterialCommunityIcons;
  }
};

const tabBarItemOptions = ({ iconLibrary, focusedIcon, unfocusedIcon, iconSize }) => ({
  tabBarIcon: ({ focused }) => {
    const IconComponent = getIconComponent(iconLibrary);

    return (
      <View
        style={[
          styles.tabBarItem,
          {
            backgroundColor: focused ? colors.blue300 : null,
          },
        ]}
      >
        <IconComponent
          name={focused ? focusedIcon : unfocusedIcon}
          size={iconSize}
          color={focused ? colors.blue800 : colors.gray400}
        />
      </View>
    );
  },
});

const BottomNavigator = () => {
  return (
    <BottomTabNavigator.Navigator
      initialRouteName="home"
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabContainer,
        tabBarShowLabel: false,
      }}
      safeAreaInsets={{
        bottom: 0,
      }}
    >
      <BottomTabNavigator.Screen
        name="home"
        component={Home}
        options={tabBarItemOptions({
          focusedIcon: 'home-variant',
          unfocusedIcon: 'home-variant-outline',
          iconSize: 34,
        })}
      />
      <BottomTabNavigator.Screen
        name="questionnares"
        component={Questionnaires}
        options={tabBarItemOptions({
          focusedIcon: 'clipboard-list',
          unfocusedIcon: 'clipboard-list-outline',
          iconSize: 34,
        })}
      />
      <BottomTabNavigator.Screen
        name="add-note"
        component={AddNote}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={[
                styles.tabBarItem,
                {
                  backgroundColor: colors.blue800,
                },
              ]}
            >
              <Ionicons
                name={focused ? 'pencil' : 'pencil-outline'}
                size={32}
                color={focused ? colors.blue300 : colors.blue100}
              />
            </View>
          ),
        }}
      />
      <BottomTabNavigator.Screen
        name="diary"
        component={Diary}
        options={tabBarItemOptions({
          focusedIcon: 'notebook',
          unfocusedIcon: 'notebook-outline',
          iconSize: 32,
        })}
      />
      <BottomTabNavigator.Screen
        name="statistics"
        component={Statistics}
        options={tabBarItemOptions({
          focusedIcon: 'stats-chart',
          unfocusedIcon: 'stats-chart-outline',
          iconSize: 30,
          iconLibrary: 'Ionicons',
        })}
      />
    </BottomTabNavigator.Navigator>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    backgroundColor: colors.blue200,
    position: 'absolute',
    width: '90%',
    height: '8%',
    borderRadius: 28,
    bottom: '3%',
    left: '5%',
    borderTopWidth: 0,
    zIndex: 2,
  },
  tabBarItem: {
    width: '75%',
    height: '80%',
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default BottomNavigator;
