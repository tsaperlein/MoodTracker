import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, Animated } from 'react-native';

// Colors
import colors from '../constants/colors';
// Fonts
import fonts from '../constants/fonts';

export default function AnswerSelector({ text, selected, onPress, disabled }) {
  const [scale] = useState(new Animated.Value(1));

  const handlePress = () => {
    if (disabled) return;

    Animated.sequence([
      Animated.timing(scale, {
        toValue: 1.2,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    onPress();
  };

  const textColor = selected ? colors.blue100 : colors.blue500;
  const backgroundColor = selected ? colors.blue500 : 'transparent';

  return (
    <TouchableOpacity onPress={handlePress} disabled={disabled}>
      <Animated.View
        style={[styles.animatedContainer, { transform: [{ scale }], backgroundColor }]}
      >
        <Text style={[styles.optionText, { color: textColor }]}>{text}</Text>
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  animatedContainer: {
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionText: {
    fontSize: 19,
    fontFamily: fonts.bold,
  },
});
