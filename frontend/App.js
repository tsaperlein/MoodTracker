import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet } from 'react-native';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

// import { Provider } from 'react-redux';
// import store from './store'; // Import your Redux store

// Navigator Components
import MainNavigator from './app/navigators/MainNavigator';
import StartNavigator from './app/navigators/StartNavigator';
import SurveyNavigator from './app/navigators/SurveyNavigator';

// App Loading Screen
import AppLoading from './app/screens/extras/AppLoading';

const getFonts = () => {
  return Font.loadAsync({
    // FjallaOne
    fjallaOne: require('./app/assets/fonts/FjallaOne-Regular.ttf'),
    // Outfit
    outfit: require('./app/assets/fonts/Outfit-Regular.ttf'),
    outfitMedium: require('./app/assets/fonts/Outfit-Medium.ttf'),
    outfitBold: require('./app/assets/fonts/Outfit-Bold.ttf'),
    // SedgwickAveDisplay
    sedgwickAve: require('./app/assets/fonts/SedgwickAveDisplay-Regular.ttf'),
    // Roboto
    roboto: require('./app/assets/fonts/Roboto-Regular.ttf'),
    robotoItalic: require('./app/assets/fonts/Roboto-Italic.ttf'),
    robotoMedium: require('./app/assets/fonts/Roboto-Medium.ttf'),
    robotoMediumItalic: require('./app/assets/fonts/Roboto-MediumItalic.ttf'),
    robotoBold: require('./app/assets/fonts/Roboto-Bold.ttf'),
    robotoBoldItalic: require('./app/assets/fonts/Roboto-BoldItalic.ttf'),
  });
};

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // API Calls
        await getFonts();
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return <AppLoading />;
  }

  return <StartNavigator />;
}

const styles = StyleSheet.create({});
