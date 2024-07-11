import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

// Colors
import colors from '../../config/colors';
// Icons
import { FontAwesome6, MaterialIcons } from '@expo/vector-icons';
// Mood Config
import moodConfig from '../../config/moodConfig';

// Components
import MoodCalendar from '../../components/MoodCalendar';

function CalendarResults({ moodFilter, onFilterToggle }) {
  return (
    <View style={styles.resultsContainer}>
      {Object.entries(moodConfig).map(([mood, { icon, color }]) => (
        <TouchableOpacity
          key={mood}
          style={[styles.statContainer, moodFilter === mood && styles.selectedStatContainer]}
          onPress={() => onFilterToggle(mood)}
        >
          {mood === 'nothing' ? (
            <MaterialIcons name={icon} size={28} color={color} />
          ) : (
            <FontAwesome6 name={icon} size={28} color={color} />
          )}
          <Text style={styles.statText}>8 Days</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

export default function Calendar() {
  const [moodFilter, setMoodFilter] = useState(null);

  const handleFilterToggle = (mood) => {
    setMoodFilter((prevMood) => (prevMood === mood ? null : mood));
  };

  return (
    <View style={styles.container}>
      <MoodCalendar moodFilter={moodFilter} />
      <CalendarResults moodFilter={moodFilter} onFilterToggle={handleFilterToggle} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    padding: '4%',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.blue900,
  },
  resultsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    alignContent: 'center',
    justifyContent: 'space-evenly',
  },
  statContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: colors.blue700a50,
    padding: '4%',
    margin: '3%',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedStatContainer: {
    borderColor: colors.blue500,
    backgroundColor: colors.blue600a50,
  },
  statText: {
    fontSize: 18,
    color: colors.blue100,
    fontFamily: 'outfitMedium',
    marginVertical: '5%',
  },
  dayContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: '8%',
    paddingHorizontal: '12%',
    borderRadius: 10,
  },
  iconContainer: {
    marginTop: '2%',
    padding: '2%',
  },
});
