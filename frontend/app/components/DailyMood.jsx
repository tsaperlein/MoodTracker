import { StyleSheet, Text, View, Dimensions } from 'react-native';
import React from 'react';

// Icons
import { FontAwesome6 } from '@expo/vector-icons';
// Mood Config
import moodConfig from '../config/moodConfig';

// Window width
const width = Dimensions.get('window').width;

export default function DailyMood({ mood = 'neutral' }) {
  const { icon, color, backgroundColor } = moodConfig[mood];

  return mood === 'nothing' ? (
    <View style={[styles.container, { backgroundColor: 'transparent' }]}></View>
  ) : (
    <View style={[styles.container, { backgroundColor }]}>
      <View style={styles.labelContainer}>
        <Text style={styles.labelStyle}>16</Text>
        <Text style={styles.labelStyle}>Mon</Text>
      </View>
      <View style={{ flex: 1 / 3, justifyContent: 'center', alignItems: 'center' }}>
        <View
          style={{
            height: '90%',
            width: '70%',
            backgroundColor: color,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <FontAwesome6 name={icon} size={24} color={backgroundColor} />
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
    fontFamily: 'outfitMedium',
    margin: '8%',
  },
});
