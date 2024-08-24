import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Dimensions } from 'react-native';

// Colors
import colors from '../config/colors';
// Fonts
import fonts from '../config/fonts';

// Components
import MoodPieChart from './MoodPieChart';

const height = Dimensions.get('window').height;

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
        <Text style={styles.text}>Last 10 surveys</Text>
      </View>
      <View style={{ flex: 6 }}>
        <MoodPieChart data={data} chartColor={colors.blue800} size={height / 11} />
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
    color: colors.blue800,
    fontSize: 20,
    fontFamily: fonts.bold,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
