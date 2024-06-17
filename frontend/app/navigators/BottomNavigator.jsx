import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

// Colors
import colors from '../config/colors';
// Icons
import { Ionicons, FontAwesome6, MaterialCommunityIcons } from '@expo/vector-icons';

// Screens
import Home from '../screens/main/Home';
import Questionnaires from '../screens/main/Questionnaires';
import AddNote from '../screens/main/AddNote';
import Diary from '../screens/main/Diary';
import Statistics from '../screens/main/Statistics';

// Bottom Navigation
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const BottomTabNavigator = createBottomTabNavigator();

// Bottom Tab Bar Height
const bottomTabBarHeight = (Dimensions.get('window').height * 8) / 100;

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

export default function BottomNavigator() {
  return (
    <BottomTabNavigator.Navigator
      initialRouteName="Home"
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
        name="Home"
        component={Home}
        options={tabBarItemOptions({
          focusedIcon: 'home-variant',
          unfocusedIcon: 'home-variant-outline',
          iconSize: 34,
        })}
      />
      <BottomTabNavigator.Screen
        name="Add Note"
        component={AddNote}
        options={tabBarItemOptions({
          focusedIcon: 'pencil',
          unfocusedIcon: 'pencil-outline',
          iconSize: 32,
        })}
      />
      <BottomTabNavigator.Screen
        name="Questionnaires"
        component={Questionnaires}
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
              <MaterialCommunityIcons
                name={focused ? 'clipboard-list' : 'clipboard-list-outline'}
                size={34}
                color={focused ? colors.blue300 : colors.blue100}
              />
            </View>
          ),
        }}
      />
      <BottomTabNavigator.Screen
        name="Diary"
        component={Diary}
        options={tabBarItemOptions({
          focusedIcon: 'notebook',
          unfocusedIcon: 'notebook-outline',
          iconSize: 32,
        })}
      />
      <BottomTabNavigator.Screen
        name="Statistics"
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
}

const styles = StyleSheet.create({
  tabContainer: {
    position: 'absolute',
    width: '90%',
    height: bottomTabBarHeight,
    borderRadius: 28,
    bottom: '3%',
    left: '5%',
    borderTopWidth: 0,
    zIndex: 2,
    overflow: 'hidden',
    backgroundColor: 'rgba(0, 0, 0, 0.95)',
  },
  tabBarItem: {
    width: '75%',
    height: '80%',
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
