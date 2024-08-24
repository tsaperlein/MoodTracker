import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

// Fonts
import fonts from '../config/fonts';
// Icons
import { FontAwesome6, MaterialIcons } from '@expo/vector-icons';

// Mood Configuration
import { moodConfig } from '../config/moodConfig';

// Window width
const width = Dimensions.get('window').width;

export default function DailyMood({ mood = 'nothing', datetime = null }) {
  if (mood === 'additional')
    return <View style={[styles.container, { backgroundColor: 'transparent' }]}></View>;

  const {
    icon,
    general: { color, backgroundColor },
  } = moodConfig[mood];

  // Convert the datetime to a Date object
  const date = datetime ? new Date(datetime) : new Date();

  // Get the day of the week and day of the month
  const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'short' });
  const dayOfMonth = date.getDate();

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
    width: width / 6,
    margin: width / 60,
    padding: '1%',
    borderRadius: 20,
    overflow: 'hidden',
  },
  labelContainer: {
    flex: 2 / 3,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  labelStyle: {
    fontSize: 16,
    fontFamily: fonts.medium,
    margin: '8%',
  },
  iconSection: {
    flex: 1 / 3,
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
