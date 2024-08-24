import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

// Colors
import colors from '../config/colors';
// Fonts
import fonts from '../config/fonts';
// Icons
import { FontAwesome6, MaterialIcons } from '@expo/vector-icons';

// Mood Configuration
import { moodConfig } from '../config/moodConfig';

export default function CalendarOptions({ moodFilter, onFilterToggle, moodCounts = null }) {
  return (
    <View style={styles.optionsContainer}>
      {Object.keys(moodConfig).map((mood) => {
        const { icon, calendar = {} } = moodConfig[mood] || {};
        const { color = colors.blue600, backgroundColor = colors.blue800 } = calendar;
        const count = moodCounts[mood] || 0;

        return (
          <TouchableOpacity
            key={mood}
            style={[
              styles.statContainer,
              moodFilter === mood && styles.selectedStatContainer,
              { backgroundColor },
              count === 1 && { paddingHorizontal: '5%' },
            ]}
            onPress={() => onFilterToggle(mood)}
          >
            {icon &&
              (mood === 'nothing' ? (
                <MaterialIcons name={icon} size={28} color={color} />
              ) : (
                <FontAwesome6 name={icon} size={28} color={color} />
              ))}
            <Text style={[styles.statText, { color }]}>
              {count !== 1 ? `${count} Days` : `${count} Day`}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  optionsContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    rowGap: '8%',
    columnGap: '25%',
    alignContent: 'center',
    justifyContent: 'space-evenly',
  },
  statContainer: {
    alignItems: 'center',
    padding: '3%',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedStatContainer: {
    borderColor: colors.blue100,
  },
  statText: {
    fontSize: 18,
    fontFamily: fonts.bold,
    marginVertical: '5%',
  },
});
