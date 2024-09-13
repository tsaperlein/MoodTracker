import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';

// Colors
import colors from '../constants/colors';
// Fonts
import fonts from '../constants/fonts';

// Components
import MoodPieChart from './MoodPieChart';

// Window height
import { HEIGHT } from '../constants/dimensions';

export default function MonthlyStats({ data, loading }) {
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.white} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Last 10 Questionnaires</Text>
      </View>
      <View style={{ flex: 6 }}>
        <MoodPieChart data={data} chartColor={colors.blue700} size={HEIGHT / 11} />
      </View>
    </View>
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
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: colors.blue300,
    fontSize: 20,
    fontFamily: fonts.bold,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
