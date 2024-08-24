import React, { useContext } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';

// Colors
import colors from '../config/colors';
// Fonts
import fonts from '../config/fonts';
// Icons
import { FontAwesome6 } from '@expo/vector-icons';

// Components
import DailyMood from './DailyMood';
import { BlurView } from 'expo-blur';

// Authorization Services
import { AuthContext } from 'context/AuthContext';

// Controller
import { useWeeklyStatsController } from '../controllers/weeklyStatsController';

export default function WeeklyStats({ action }) {
  const { authData } = useContext(AuthContext);
  const { moodsWithAdditional } = useWeeklyStatsController(authData);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>Welcome Moods of the week</Text>
      </View>
      <View style={styles.scrollViewContainer}>
        <ScrollView
          horizontal
          contentContainerStyle={styles.scrollViewContent}
          showsHorizontalScrollIndicator={false}
        >
          {moodsWithAdditional.map((mood, index) => (
            <DailyMood key={index} mood={mood.type} datetime={mood.datetime} />
          ))}
        </ScrollView>
      </View>
      <BlurView intensity={30} style={styles.arrowButtonContainer}>
        <TouchableOpacity style={styles.arrowButton} onPress={action}>
          <FontAwesome6 name="circle-arrow-right" size={60} color="black" />
        </TouchableOpacity>
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  labelContainer: {
    flex: 1 / 6,
    justifyContent: 'center',
    padding: '2%',
    paddingBottom: 0,
  },
  label: {
    color: colors.blue800,
    fontSize: 21,
    fontFamily: fonts.bold,
  },
  scrollViewContainer: {
    flex: 5 / 6,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: '2%',
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
  arrowButton: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
