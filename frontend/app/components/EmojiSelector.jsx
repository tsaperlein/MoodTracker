// EmojiSelector.js
import React, { useState, useEffect } from 'react';
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

function Emoji({ mood, selected, onPress, disabled }) {
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

export default function EmojiSelector({ setEmojiSelected, initialMood, disabled }) {
  const [selectedMood, setSelectedMood] = useState(initialMood);

  useEffect(() => {
    setSelectedMood(initialMood);
  }, [initialMood]);

  const handlePress = (mood) => {
    if (disabled) return;
    if (selectedMood === mood) {
      setSelectedMood(null);
      setEmojiSelected(null);
    } else {
      setSelectedMood(mood);
      setEmojiSelected(mood);
    }
  };

  return (
    <View style={styles.container}>
      {moods.map((mood) => (
        <Emoji
          key={mood}
          mood={mood}
          selected={selectedMood === mood}
          onPress={() => handlePress(mood)}
          disabled={disabled}
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
