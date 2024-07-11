import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';

// Colors
import colors from '../config/colors';
// Icons
import { FontAwesome6 } from '@expo/vector-icons';

// Components
import DailyMood from './DailyMood';
import { BlurView } from 'expo-blur';

export default function WeeklyStats({ action }) {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 / 6, justifyContent: 'center', padding: '2%', paddingBottom: 0 }}>
        <Text style={{ fontSize: 20, fontFamily: 'outfitMedium' }}>Stats of the Week</Text>
      </View>
      <View style={{ flex: 5 / 6 }}>
        <ScrollView
          horizontal
          contentContainerStyle={styles.scrollViewContent}
          showsHorizontalScrollIndicator={false}
        >
          <DailyMood mood="awful" />
          <DailyMood mood="sad" />
          <DailyMood mood="neutral" />
          <DailyMood mood="good" />
          <DailyMood mood="happy" />
          <DailyMood mood="neutral" />
          <DailyMood mood="good" />
          <DailyMood mood="nothing" />
        </ScrollView>
      </View>
      <BlurView intensity={30} style={styles.arrowButtonContainer}>
        <TouchableOpacity
          style={{ height: '100%', widht: '100%', justifyContent: 'center', alignItems: 'center' }}
          onPress={action}
        >
          <FontAwesome6 name="circle-arrow-right" size={60} color="black" />
        </TouchableOpacity>
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: '2%',
  },
  text: {
    width: 100,
    height: 50,
    backgroundColor: colors.blue100,
    margin: 10,
    textAlign: 'center',
    lineHeight: 50,
  },
  arrowButtonContainer: {
    position: 'absolute',
    right: 0,
    width: '20%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    overflow: 'hidden',
  },
});
