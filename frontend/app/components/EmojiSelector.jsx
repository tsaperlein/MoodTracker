import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View } from 'react-native';

// Fonts
import fonts from '../constants/fonts';

// Components
import Emoji from './Emoji';

// Mood Configuration
import { moods } from '../config/moodConfig';

export default function EmojiSelector({
  setEmojiSelected,
  initialMood,
  disabled,
  emojiColor,
  emojiBackgroundColor,
  underTextColor,
}) {
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
      <View style={styles.moodContainer}>
        {moods.map((mood) => (
          <Emoji
            key={mood}
            mood={mood}
            selected={selectedMood === mood}
            onPress={() => handlePress(mood)}
            disabled={disabled}
            emojiColor={emojiColor}
            emojiBackgroundColor={emojiBackgroundColor}
          />
        ))}
      </View>
      <View style={styles.underTextContainer}>
        <Text style={[styles.underText, { color: underTextColor }]}>Choose one of the </Text>
        <Text
          style={[styles.underText, { color: underTextColor, textDecorationLine: 'underline' }]}
        >
          Welcome Moods
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  moodContainer: {
    flex: 5,
    width: '100%',
    flexDirection: 'row',
  },
  underTextContainer: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  underText: {
    fontSize: 18,
    fontFamily: fonts.italicBold,
  },
});
