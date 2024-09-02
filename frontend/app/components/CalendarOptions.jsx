import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Platform } from 'react-native';

// Colors
import colors from '../constants/colors';
// Fonts
import fonts from '../constants/fonts';
// Border
import { border } from '../config/borderConfig';
// Icons
import { FontAwesome6, MaterialIcons } from '@expo/vector-icons';

// Mood Configuration
import { moodConfig } from '../config/moodConfig';

// Window Height
import { HEIGHT } from '../constants/dimensions';

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
              border(2),
              moodFilter === mood && styles.selectedStatContainer,
              { backgroundColor },
              count === 1 && { paddingHorizontal: HEIGHT < 800 ? '4%' : '5%' },
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
    rowGap: Platform.OS === 'ios' ? '8%' : 0,
    columnGap: Platform.OS === 'ios' ? '25%' : 0,
    alignContent: 'center',
    justifyContent: 'space-evenly',
  },
  statContainer: {
    alignItems: 'center',
    padding: HEIGHT < 800 ? '2%' : '4%',
    marginVertical: Platform.OS === 'android' ? '1%' : 0,
    marginHorizontal: Platform.OS === 'android' ? '3%' : 0,
    borderRadius: 10,
    borderColor: 'transparent',
  },
  selectedStatContainer: {
    borderColor: colors.blue100,
  },
  statText: {
    fontSize: 17,
    fontFamily: fonts.bold,
  },
});
