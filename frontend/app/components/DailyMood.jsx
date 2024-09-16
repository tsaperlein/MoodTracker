import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

// Fonts
import fonts from '../constants/fonts';
// Icons
import { FontAwesome6, MaterialIcons } from '@expo/vector-icons';

// Mood Configuration
import { moodConfig } from '../config/moodConfig';

// Window width
import { WIDTH } from '../constants/dimensions';

export default function DailyMood({ mood = 'nothing', datetime = null }) {
  if (mood === 'additional')
    return <View style={[styles.container, { backgroundColor: 'transparent' }]}></View>;

  const {
    icon,
    general: { color, backgroundColor },
  } = moodConfig[mood] || moodConfig['nothing']; // Fallback to 'nothing' if mood not found

  // Convert the datetime to a Date object
  const date = datetime ? new Date(datetime) : new Date();

  // Get the day of the week and day of the month
  const options = { weekday: 'short', timeZone: 'UTC' };
  const dayOfWeek = date.toLocaleDateString('en-US', options);
  const dayOfMonth = date.getUTCDate();

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View style={styles.labelContainer}>
        <Text style={styles.labelStyle}>{dayOfMonth}</Text>
        <Text style={styles.labelStyle}>{dayOfWeek}</Text>
      </View>
      <View style={styles.iconSection}>
        <View style={[styles.iconContainer, { backgroundColor: color }]}>
          {mood === 'nothing' ? (
            <MaterialIcons name={icon} size={24} color={backgroundColor} />
          ) : (
            <FontAwesome6 name={icon} size={24} color={backgroundColor} />
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: WIDTH / 6,
    margin: WIDTH / 60,
    padding: '1%',
    borderRadius: 20,
    overflow: 'hidden',
  },
  labelContainer: {
    flex: 2,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  labelStyle: {
    fontSize: 16,
    fontFamily: fonts.medium,
    margin: '8%',
  },
  iconSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    height: '90%',
    width: '70%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
