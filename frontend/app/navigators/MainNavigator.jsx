import React from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';

// Colors
import colors from '../config/colors';
// Icons
import { MaterialIcons } from '@expo/vector-icons';

// Screens
import Profile from '../screens/main/Profile';

// Navigation
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
const Stack = createStackNavigator();

// Navigator Components
import BottomNavigator from './BottomNavigator';
import SurveyNavigator from './SurveyNavigator';

// Components
import { Avatar } from 'react-native-elements';

// Header Height
const headerHEIGHT = (Dimensions.get('window').height * 12) / 100;

// Header Options
const headerOptions = {
  headerRight: () => {
    const navigation = useNavigation();

    return (
      <Avatar
        rounded
        source={require('../assets/images/tsaperlein.png')}
        onPress={() => navigation.navigate('Profile')}
        activeOpacity={0.5}
        containerStyle={styles.topTabBar}
      />
    );
  },
  headerTitle: () => (
    <View style={{ justifyContent: 'center' }}>
      <Text style={styles.appName}>Hi,{'\n'}Alexandros Tsaparas</Text>
    </View>
  ),
  headerTransparent: true,
  headerStyle: {
    height: headerHEIGHT,
    borderBottomWidth: 0,
  },
  headerBackTitleVisible: false,
};

// Navigation to Profile
const ProfileHeaderOptions = {
  headerTitle: () => (
    <View style={{ justifyContent: 'center' }}>
      <Text style={{ color: 'white', fontSize: 20, fontWeight: '700' }}>Profile</Text>
    </View>
  ),
  headerTransparent: true,
  headerStyle: {
    height: headerHEIGHT,
    borderBottomWidth: 0,
  },
  headerBackTitleVisible: false,
  headerBackImage: () => <MaterialIcons name="arrow-back-ios-new" size={30} color="white" />,
};

export default function MainNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Bottom Navigator"
      screenOptions={{
        gestureEnabled: true,
        ...TransitionPresets.SlideFromRightIOS,
      }}
    >
      <Stack.Screen name="Bottom Navigator" component={BottomNavigator} options={headerOptions} />
      <Stack.Screen
        name="Today's Survey"
        component={SurveyNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Profile" component={Profile} options={ProfileHeaderOptions} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  topTabBar: {
    flex: 1,
    width: '70%',
    marginRight: '15%',
    borderRadius: 40,
    overflow: 'hidden',
  },
  appName: {
    color: colors.blue800,
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
  },
});
