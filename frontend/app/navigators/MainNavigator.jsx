import React from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';

// Screens
import Profile from '../screens/main/Profile';
import BottomNavigator from './BottomNavigator';
import SurveyNavigator from './SurveyNavigator';
import StatsNavigator from './StatsNavigator';

// Colors
import colors from '../config/colors';
// Icons
import { MaterialIcons, MaterialCommunityIcons, FontAwesome6 } from '@expo/vector-icons';

// Components
import { Avatar } from 'react-native-elements';

// Navigation
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
const Stack = createStackNavigator();

// Header Height
const headerHEIGHT = (Dimensions.get('window').height * 12) / 100;

const HeaderAvatar = () => {
  const navigation = useNavigation();
  return (
    <Avatar
      rounded
      source={require('../assets/images/tsaperlein.png')}
      onPress={() => navigation.navigate('Profile')}
      activeOpacity={0.5}
      containerStyle={styles.avatarContainer}
    />
  );
};

const HeaderTitle = () => (
  <View style={styles.headerTitleContainer}>
    <Text style={styles.appName}>Hello, Alexandros</Text>
    <View style={styles.featureContainer}>
      <View style={[styles.feature, { backgroundColor: colors.blue700 }]}>
        <MaterialCommunityIcons name="speedometer" size={20} color="white" />
        <Text style={styles.featureText}>80% Score</Text>
      </View>
      <View style={[styles.feature, { backgroundColor: colors.blue100 }]}>
        <FontAwesome6 name="calendar-check" size={20} color="black" />
      </View>
    </View>
  </View>
);

const headerOptions = {
  headerRight: () => <HeaderAvatar />,
  headerTitle: () => <HeaderTitle />,
  headerTransparent: true,
  headerStyle: {
    height: headerHEIGHT,
    borderBottomWidth: 0,
  },
  headerBackTitleVisible: false,
};

const ProfileHeaderOptions = {
  headerTitle: () => (
    <View style={styles.profileHeaderTitleContainer}>
      <Text style={styles.profileHeaderText}>Profile</Text>
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

const StatsNavigatorOptions = {
  headerTitle: 'Statistics',
  headerTransparent: false,
  headerStyle: {
    height: headerHEIGHT,
    borderBottomWidth: 0,
    backgroundColor: colors.blue900,
  },
  headerTitleStyle: {
    color: colors.blue300,
    fontFamily: 'outfitBold',
    fontSize: 24,
  },
  headerBackTitleVisible: false,
  headerBackImage: () => (
    <MaterialIcons name="arrow-back-ios-new" size={30} color={colors.blue300} />
  ),
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
        initialParams={{ mode: 'current' }}
      />
      <Stack.Screen
        name="Stats Navigator"
        component={StatsNavigator}
        options={StatsNavigatorOptions}
      />
      <Stack.Screen name="Profile" component={Profile} options={ProfileHeaderOptions} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  avatarContainer: {
    flex: 1,
    width: '65%',
    marginRight: '10%',
    borderRadius: 50,
    overflow: 'hidden',
  },
  headerTitleContainer: {
    flex: 1,
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  appName: {
    flex: 1 / 2,
    color: colors.blue800,
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
  },
  featureContainer: {
    flex: 1 / 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  feature: {
    flexDirection: 'row',
    height: '100%',
    margin: '2%',
    paddingHorizontal: '3%',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  featureText: {
    color: 'white',
    fontSize: 13,
    fontFamily: 'outfitMedium',
    marginLeft: '3%',
  },
  profileHeaderTitleContainer: {
    justifyContent: 'center',
  },
  profileHeaderText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '700',
  },
});
