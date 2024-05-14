import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Platform,
  Dimensions,
  Image,
  Pressable,
} from 'react-native';

// Screens
import Profile from '../screens/Profile';

// Colors
import colors from '../config/colors';
// Icons
import { FontAwesome6, MaterialIcons } from '@expo/vector-icons';

// Header Height
const headerHEIGHT = (Dimensions.get('window').height * 12) / 100;

// Bottom Navigator
import BottomNavigator from './BottomNavigator';

// Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
const Stack = createStackNavigator();

// Remove Android Bottom Bar
import SystemNavigationBar from 'react-native-system-navigation-bar';
if (Platform.OS === 'android') SystemNavigationBar.immersive();

// Header Options
const headerOptions = {
  headerRight: () => {
    const navigation = useNavigation();

    return (
      <View style={styles.topTabBar}>
        <Pressable style={styles.topTabBarItem} onPress={() => navigation.navigate('Profile')}>
          <Image
            style={{
              flex: 1,
              width: '100%',
              height: '100%',
              resizeMode: 'cover',
            }}
            source={require('../assets/images/tsaperlein.png')}
          />
        </Pressable>
      </View>
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

// Navigation to Messages or Notifications screens
const ProfileHeaderOptions = {
  headerTitle: 'Profile',
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
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          gestureEnabled: true,
          ...TransitionPresets.SlideFromRightIOS,
        }}
      >
        <Stack.Screen
          name="Bottom Navigation"
          component={BottomNavigator}
          options={headerOptions}
        />
        <Stack.Screen name="Profile" component={Profile} options={ProfileHeaderOptions} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  topTabBar: {
    flex: 1,
    flexDirection: 'row',
    width: '70%',
    marginRight: '15%',
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderColor: colors.blue400,
    borderWidth: '1%',
  },
  topTabBarItem: {
    flex: 1,
    alignSelf: 'center',
  },
  appName: {
    color: colors.blue800,
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
  },
});
