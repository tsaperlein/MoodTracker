import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Text, Animated } from 'react-native';

// Colors
import colors from '../../config/colors';
// Fonts
import fonts from '../../config/fonts';

// Animations Screens
import LottieView from 'lottie-react-native';

// Window Width and Height
import { HEIGHT, WIDTH } from '../../config/dimensions';

export default function Splashscreen() {
  const [showTitle, setShowTitle] = useState(false);
  const scaleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTitle(true);
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }).start();
    }, 2000);

    return () => clearTimeout(timer);
  }, [scaleAnim]);

  return (
    <View style={styles.container}>
      <LottieView
        source={require('../../assets/lottie-animations/splashscreen.json')}
        autoPlay
        loop={false}
        style={styles.animation}
        resizeMode="cover"
      />
      {showTitle && (
        <Animated.View style={[styles.titleContainer, { transform: [{ scale: scaleAnim }] }]}>
          <Text style={styles.title}>Mood Tracker</Text>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animation: {
    width: WIDTH,
    height: HEIGHT,
  },
  titleContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: colors.green500,
    fontSize: 40,
    fontFamily: fonts.bold,
  },
});
