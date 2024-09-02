import React, { useState } from 'react';
import { StyleSheet, View, Pressable, Animated } from 'react-native';

// Colors
import colors from '../constants/colors';
// Icons
import { FontAwesome6 } from '@expo/vector-icons';

// Mood Configuration
import { moodConfig } from '../config/moodConfig';

export default function Emoji({
  mood,
  selected,
  onPress,
  disabled,
  emojiColor = colors.blue100,
  emojiBackgroundColor = colors.blue100,
}) {
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

  const color = selected ? moodConfig[mood].general.color : emojiColor;
  const backgroundColor = selected ? emojiBackgroundColor : 'transparent';

  return (
    <View style={styles.container}>
      <Pressable onPress={handlePress}>
        <Animated.View style={[styles.iconContainer, { backgroundColor, transform: [{ scale }] }]}>
          <FontAwesome6 name={moodConfig[mood].icon} size={40} color={color} />
        </Animated.View>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  iconContainer: {
    padding: '12%',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
