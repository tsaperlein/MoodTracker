import React, { useState } from 'react';
import { StyleSheet, View, Pressable, Animated } from 'react-native';

// Colors
import colors from '../config/colors';
// Icons
import { FontAwesome6 } from '@expo/vector-icons';

const moods = ['awful', 'sad', 'neutral', 'good', 'happy'];
const moodConfig = {
  awful: { icon: 'sad-cry', color: 'darkred' },
  sad: { icon: 'frown', color: 'red' },
  neutral: { icon: 'meh', color: 'orange' },
  good: { icon: 'smile', color: 'blue' },
  happy: { icon: 'laugh-beam', color: 'green' },
};

function Emoji({ mood, selected, onPress }) {
  const [scale] = useState(new Animated.Value(1));

  const handlePress = () => {
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

    onPress(); // Call the parent handler
  };

  const backgroundColor = selected ? colors.white : 'transparent';
  const iconColor = selected ? moodConfig[mood].color : colors.blue400;

  return (
    <View style={styles.container}>
      <Pressable onPress={handlePress}>
        <Animated.View style={[styles.iconContainer, { backgroundColor, transform: [{ scale }] }]}>
          <FontAwesome6 name={moodConfig[mood].icon} size={40} color={iconColor} />
        </Animated.View>
      </Pressable>
    </View>
  );
}

export default function EmojiSelector() {
  const [selectedMood, setSelectedMood] = useState(null);

  const handlePress = (mood) => {
    setSelectedMood(mood === selectedMood ? null : mood); // Deselect if the same mood is pressed
  };

  return (
    <View style={styles.container}>
      {moods.map((mood) => (
        <Emoji
          key={mood}
          mood={mood}
          selected={selectedMood === mood}
          onPress={() => handlePress(mood)}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  emojiContainer: {
    flex: 1 / 5,
  },
  iconContainer: {
    padding: 10,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
