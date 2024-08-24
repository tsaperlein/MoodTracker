import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

// Colors
import colors from '../config/colors';
// Fonts
import fonts from '../config/fonts';

// Mood Configuration
import { moodConfig } from '../config/moodConfig';

// Components
import { PieChart } from 'react-native-gifted-charts';

// Utilities
import { getRatioOutcome } from '../utils/ratioUtil';

// Window Height
const height = Dimensions.get('window').height;

export default function MoodPieChart({ data, chartColor = colors.blue800, size = height / 9 }) {
  const [selectedMood, setSelectedMood] = useState(null);

  // Calculate the frequency of each mood
  const moodCounts = {
    awful: 0,
    sad: 0,
    neutral: 0,
    good: 0,
    happy: 0,
  };

  data.forEach((item) => {
    const mood = getRatioOutcome(item.value, 26, 'emotion');
    moodCounts[mood] += 1;
  });

  // Convert moodCounts into pie chart data
  const totalMoods = data.length;
  const pieData = Object.keys(moodCounts)
    .filter((mood) => moodCounts[mood] > 0)
    .map((mood) => {
      const percentage = ((moodCounts[mood] / totalMoods) * 100).toFixed(2);
      return {
        value: parseFloat(percentage),
        color: moodConfig[mood].calendar.backgroundColor,
        gradientCenterColor: moodConfig[mood].calendar.color,
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
        strokeWidth={3}
        strokeColor={chartColor}
        innerCircleBorderWidth={3}
        innerCircleBorderColor={chartColor}
        radius={size}
        innerRadius={size - 40}
        innerCircleColor={chartColor}
        focusOnPress
        centerLabelComponent={() => {
          if (selectedMood) {
            const selectedData = pieData.find((data) => data.mood === selectedMood);
            return (
              <View style={styles.centerLabelContainer}>
                <Text style={styles.centerLabel}>{selectedData.value}%</Text>
                <Text style={styles.centerLabel}>
                  {selectedMood.charAt(0).toUpperCase() + selectedMood.slice(1)}
                </Text>
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
  centerLabelContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerLabel: {
    fontSize: 18,
    color: colors.blue200,
    fontFamily: fonts.medium,
  },
});
