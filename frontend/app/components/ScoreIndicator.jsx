import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Text, Animated, Easing } from 'react-native';
import Svg, { Circle, G } from 'react-native-svg';

// Colors
import colors from '../config/colors';

export default function ScoreIndicator() {
  const progress = 80;
  const animatedValue = useRef(new Animated.Value(0)).current;
  const circleRadius = 80;
  const circleCircumference = 2 * Math.PI * circleRadius;
  const strokeDashoffset = animatedValue.interpolate({
    inputRange: [0, 100],
    outputRange: [circleCircumference, circleCircumference * (1 - progress / 100)],
  });

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: progress,
      delay: 300,
      duration: 1200,
      useNativeDriver: true,
      easing: Easing.out(Easing.ease),
    }).start();
  }, [progress]);

  return (
    <View style={styles.container}>
      <Svg width="200" height="200" viewBox="0 0 200 200">
        <Circle
          cx="100"
          cy="100"
          r={circleRadius}
          stroke={colors.blue200}
          strokeWidth="25"
          fill="none"
        />
        <G rotation="-90" origin="100, 100">
          <AnimatedCircle
            cx="100"
            cy="100"
            r={circleRadius}
            stroke={colors.blue500}
            strokeWidth="20"
            fill="none"
            strokeDasharray={circleCircumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </G>
      </Svg>
      <Text style={styles.scoreText}>{progress}%</Text>
    </View>
  );
}

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreText: {
    position: 'absolute',
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.blue500,
  },
});
