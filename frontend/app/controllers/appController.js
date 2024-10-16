import { useState, useEffect } from 'react';

// Font
import * as Font from 'expo-font';

// SplashScreen
import * as SplashScreen from 'expo-splash-screen';

// Authorization Services
import { useAuth } from 'context/AuthContext';
// Mood Services
import { useMood } from 'context/MoodContext';

const getFonts = () => {
  return Font.loadAsync({
    // Outfit
    outfit: require('../assets/fonts/Outfit-Regular.ttf'),
    outfitMedium: require('../assets/fonts/Outfit-Medium.ttf'),
    outfitBold: require('../assets/fonts/Outfit-Bold.ttf'),
    // Roboto
    roboto: require('../assets/fonts/Roboto-Regular.ttf'),
    robotoItalic: require('../assets/fonts/Roboto-Italic.ttf'),
    robotoMedium: require('../assets/fonts/Roboto-Medium.ttf'),
    robotoMediumItalic: require('../assets/fonts/Roboto-MediumItalic.ttf'),
    robotoBold: require('../assets/fonts/Roboto-Bold.ttf'),
    robotoBoldItalic: require('../assets/fonts/Roboto-BoldItalic.ttf'),
    // FjallaOne
    fjallaOne: require('../assets/fonts/FjallaOne-Regular.ttf'),
    // Press Start 2P
    pressStart2p: require('../assets/fonts/PressStart2P-Regular.ttf'),
  });
};

export const useAppController = () => {
  const authContext = useAuth();
  const moodContext = useMood();
  const [appIsReady, setAppIsReady] = useState(false);
  const [splashScreenLoading, setSplashScreenLoading] = useState(true);

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();

        await getFonts();
        if (authContext?.loadSession) {
          await authContext.loadSession();
        }
        if (moodContext?.checkMoodStatus) {
          await moodContext.checkMoodStatus();
        }
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
        await SplashScreen.hideAsync();
      }
    }

    prepare();
  }, [authContext, moodContext]);

  useEffect(() => {
    if (appIsReady) {
      const splashTimeout = setTimeout(() => {
        setSplashScreenLoading(false);
      }, 4000);
      return () => clearTimeout(splashTimeout);
    }
  }, [appIsReady, splashScreenLoading]);

  return splashScreenLoading;
};
