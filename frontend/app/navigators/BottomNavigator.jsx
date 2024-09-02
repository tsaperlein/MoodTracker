import React from 'react';
import { View, StyleSheet } from 'react-native';

// Colors
import colors from '../constants/colors';
// Icons
import { Ionicons, FontAwesome6, MaterialCommunityIcons } from '@expo/vector-icons';

// Screens
import Home from '../screens/main/Home';
import Questionnaires from '../screens/main/Questionnaires';

// Bottom Navigation
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const BottomTabNavigator = createBottomTabNavigator();

// Window height
import { HEIGHT } from '../constants/dimensions';

// Bottom Tab Bar Height
const bottomTabBarHeight = (HEIGHT * 8) / 100;

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
            backgroundColor: focused ? colors.blue200 : null,
          },
        ]}
      >
        <IconComponent
          name={focused ? focusedIcon : unfocusedIcon}
          size={iconSize}
          color={focused ? colors.blue600 : colors.gray100}
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
          iconLibrary: 'Ionicons',
          focusedIcon: 'home',
          unfocusedIcon: 'home-outline',
          iconSize: 32,
        })}
      />
      <BottomTabNavigator.Screen
        name="Questionnaires"
        component={Questionnaires}
        options={tabBarItemOptions({
          iconLibrary: 'FontAwesome6',
          focusedIcon: 'clipboard-list',
          unfocusedIcon: 'clipboard-list',
          iconSize: 34,
        })}
      />
    </BottomTabNavigator.Navigator>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    position: 'absolute',
    width: '80%',
    height: bottomTabBarHeight,
    borderRadius: 28,
    bottom: HEIGHT < 800 ? '1%' : '3%',
    left: '10%',
    borderTopWidth: 0,
    zIndex: 2,
    overflow: 'hidden',
    backgroundColor: colors.blue300,
  },
  tabBarItem: {
    width: '88%',
    height: '78%',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
