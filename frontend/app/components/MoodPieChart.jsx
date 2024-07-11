import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';

import colors from '../config/colors';
import moodConfig from '../config/moodConfig';

export default function MoodPieChart({ data, chartColor = colors.blue800, size = 95 }) {
  const [selectedMood, setSelectedMood] = useState(null);

  const totalMoods = data.length;

  // Calculate the frequency of each mood
  const moodCounts = data.reduce((acc, moodData) => {
    const mood = Object.keys(moodConfig).find((key) => moodConfig[key].value === moodData.value);
    if (!acc[mood]) {
      acc[mood] = 0;
    }
    acc[mood] += 1;
    return acc;
  }, {});

  // Calculate the percentage for each mood and create the pie data
  const pieData = Object.keys(moodCounts).map((mood) => {
    const percentage = ((moodCounts[mood] / totalMoods) * 100).toFixed(2);
    return {
      value: parseFloat(percentage),
      color: moodConfig[mood].backgroundColor,
      gradientCenterColor: moodConfig[mood].color,
      mood: mood,
      focused: selectedMood === mood,
      onPress: () => handleSectionPress(mood),
    };
  });

  const handleSectionPress = (mood) => {
    setSelectedMood(mood === selectedMood ? null : mood);
  };

  return (
    <View style={styles.pieChartWrapper}>
      <PieChart
        data={pieData}
        donut
        strokeWidth={2}
        strokeColor={chartColor}
        innerCircleBorderWidth={2}
        innerCircleBorderColor={chartColor}
        radius={size}
        innerRadius={size - 40}
        innerCircleColor={chartColor}
        focusOnPress
        centerLabelComponent={() => {
          if (selectedMood) {
            const selectedData = pieData.find((data) => data.mood === selectedMood);
            return (
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={styles.centerLabel}>{selectedData.value}%</Text>
                <Text style={styles.centerLabel}>{selectedMood}</Text>
              </View>
            );
          }
          return null;
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  pieChartWrapper: {
    flex: 3,
    padding: '2%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
