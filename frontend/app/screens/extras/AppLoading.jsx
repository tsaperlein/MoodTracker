import React from 'react';
import { View, StyleSheet } from 'react-native';

// Colors
import colors from '../../config/colors';

// Animations Screens
import LottieView from 'lottie-react-native';

export default function AppLoading({ backgroundColor = colors.blue400, mode = 'dark' }) {
  return (
    <View style={[styles.container, { backgroundColor }]}>
      <LottieView
        source={
          mode === 'dark'
            ? require('../../assets/lottie-animations/black-dino-animation.json')
            : require('../../assets/lottie-animations/white-dino-animation.json')
        }
        autoPlay
        loop={true}
        style={styles.animation}
      />
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
    width: '80%',
    height: '30%',
  },
});
