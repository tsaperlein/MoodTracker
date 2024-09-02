import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

// Colors
import colors from '../../constants/colors';
// Fonts
import fonts from '../../constants/fonts';

// Animations Screens
import LottieView from 'lottie-react-native';

export default function Connecting() {
  const text = 'Connecting...';
  const opacityArray = useRef(text.split('').map(() => new Animated.Value(0))).current;

  useEffect(() => {
    const animateText = () => {
      const fadeInAnimations = text.split('').map((_, i) => {
        return Animated.timing(opacityArray[i], {
          toValue: 1,
          duration: 200,
          delay: i * 20,
          useNativeDriver: true,
        });
      });

      const fadeOutAnimations = text.split('').map((_, i) => {
        return Animated.timing(opacityArray[i], {
          toValue: 0,
          duration: 200,
          delay: i * 20,
          useNativeDriver: true,
        });
      });

      const combinedAnimations = fadeInAnimations.concat(fadeOutAnimations);

      // Use Animated.loop to loop the sequence indefinitely
      Animated.loop(Animated.stagger(50, combinedAnimations)).start();
    };

    animateText();

    return () => {
      opacityArray.forEach((anim) => anim.stopAnimation());
    };
  }, [opacityArray]);

  return (
    <View style={styles.container}>
      <LottieView
        source={require('../../assets/lottie-animations/connecting-animation.json')}
        autoPlay
        loop={true}
        style={styles.animation}
      />
      <View style={{ flex: 1, width: '100%' }}>
        <View style={styles.textContainer}>
          {text.split('').map((char, index) => (
            <Animated.Text key={index} style={[styles.letter, { opacity: opacityArray[index] }]}>
              {char}
            </Animated.Text>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.blue400,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animation: {
    flex: 2,
    width: '50%',
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  letter: {
    color: colors.green500,
    fontSize: 40,
    fontFamily: fonts.bold,
  },
});
