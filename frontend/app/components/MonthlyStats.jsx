import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

// Colors
import colors from '../config/colors';
// Mood Config
import { monthData } from '../assets/moodDateData';

// Components
import MoodPieChart from './MoodPieChart';

export default function MonthlyStats({ action }) {
  return (
    <TouchableOpacity style={styles.container} onPress={action}>
      <View style={{ flex: 1 / 6, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 20, fontFamily: 'outfitMedium' }}>Stats of the Month</Text>
      </View>
      <View style={{ flex: 5 / 6 }}>
        <MoodPieChart data={monthData} chartColor={colors.blue700} size={80} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
