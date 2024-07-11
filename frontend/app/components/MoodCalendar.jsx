import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

// Colors
import colors from '../config/colors';
// Icons
import { FontAwesome6, MaterialIcons } from '@expo/vector-icons';
// Mood Config
import moodConfig from '../config/moodConfig';

// Components
import { Calendar } from 'react-native-calendars';

import mockMonthData from '../assets/mockMonthData'; // Update this path accordingly

const getMoodFromValue = (value) => {
  return Object.keys(moodConfig).find((key) => moodConfig[key].value === value);
};

const MoodIcon = ({ moodStyle }) => {
  if (moodStyle.icon === 'face-retouching-off') {
    return <MaterialIcons name={moodStyle.icon} size={16} color={moodStyle.color} />;
  }
  return <FontAwesome6 name={moodStyle.icon} size={16} color={moodStyle.color} />;
};

const CustomDayComponent = ({ date, state, marking }) => {
  const today = new Date().toISOString().slice(0, 10) === date.dateString;
  const isExtraDay = state === 'disabled';
  const mood = marking?.mood !== undefined && moodConfig[getMoodFromValue(marking.mood)];
  const moodStyle = mood || { backgroundColor: colors.blue500, color: 'black', icon: null };

  const containerStyle = [
    styles.dayContainer,
    {
      backgroundColor: isExtraDay ? colors.blue300a50 : moodStyle.backgroundColor,
      borderWidth: today ? '2%' : 0,
      borderColor: today ? colors.black : 'transparent',
    },
  ];

  const textStyle = {
    textAlign: 'center',
    color: isExtraDay ? colors.blue200 : today ? 'black' : moodStyle.color,
    fontFamily: today ? 'outfitBold' : 'outfit',
  };

  return (
    <View style={containerStyle}>
      <Text style={textStyle}>{date.day}</Text>
      {!isExtraDay && moodStyle.icon && (
        <View style={styles.iconContainer}>
          <MoodIcon moodStyle={moodStyle} />
        </View>
      )}
    </View>
  );
};

export default function MoodCalendar({ moodFilter }) {
  const [markedDates, setMarkedDates] = useState({});

  useEffect(() => {
    setMarkedDates(mockMonthData);
  }, []);

  const filteredDates = moodFilter
    ? Object.fromEntries(
        Object.entries(markedDates).filter(
          ([date, { mood }]) => getMoodFromValue(mood) === moodFilter
        )
      )
    : markedDates;

  return (
    <View style={styles.container}>
      <Calendar
        style={{ backgroundColor: colors.blue400, padding: '3%' }}
        dayComponent={({ date, state, marking }) => (
          <CustomDayComponent date={date} state={state} marking={marking} />
        )}
        markedDates={filteredDates}
        theme={{
          calendarBackground: colors.blue400,
          textSectionTitleColor: colors.blue900,
          monthTextColor: colors.blue900,
          textDayHeaderFontFamily: 'outfit',
          textDayHeaderFontSize: 15,
          textMonthFontFamily: 'outfitMedium',
          textMonthFontSize: 24,
        }}
        renderArrow={(direction) =>
          direction === 'right' ? (
            <FontAwesome6 name="arrow-right" size={20} color={colors.blue900} />
          ) : (
            <FontAwesome6 name="arrow-left" size={20} color={colors.blue900} />
          )
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 20,
    overflow: 'hidden',
  },
  dayContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 35,
    height: 45,
    paddingHorizontal: '12%',
    borderRadius: 10,
  },
  iconContainer: {
    marginTop: '2%',
    padding: '2%',
  },
});
