import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

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

// Components
import { Calendar } from 'react-native-calendars';

// Window Width and Height
import { WIDTH, HEIGHT } from '../constants/dimensions';

// Controller
import { useCalendarController } from '../controllers/calendarController';

const MoodIcon = ({ moodStyle }) => {
  if (moodStyle.icon === 'face-retouching-off') {
    return (
      <MaterialIcons
        name={moodStyle.icon}
        size={HEIGHT < 800 ? 13 : 16}
        color={moodStyle.calendar.color}
      />
    );
  }
  return (
    <FontAwesome6
      name={moodStyle.icon}
      size={HEIGHT < 800 ? 12 : 15}
      color={moodStyle.calendar.color}
    />
  );
};

const CustomDayComponent = ({ date, state, mood }) => {
  const today = new Date().toISOString().slice(0, 10) === date.dateString;
  const isExtraDay = state === 'disabled';

  const moodStyle = mood
    ? moodConfig[mood]
    : { icon: null, calendar: { backgroundColor: colors.blue400a50, color: colors.blue900 } };

  const containerStyle = [
    styles.dayContainer,
    today ? border(2) : null,
    {
      backgroundColor: isExtraDay ? colors.blue200a70 : moodStyle.calendar.backgroundColor,
      borderColor: today ? colors.blue900 : 'transparent',
    },
  ];

  const textStyle = {
    textAlign: 'center',
    color: isExtraDay ? colors.blue100 : today ? colors.blue900 : moodStyle.calendar.color,
    fontFamily: today ? fonts.bold : fonts.original,
    fontSize: HEIGHT < 800 ? 11 : 13,
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

export default function MoodCalendar({ moodFilter, onMonthChange }) {
  const { markedDates } = useCalendarController();

  const filteredDates = moodFilter
    ? Object.fromEntries(
        Object.entries(markedDates).filter(([date, { mood }]) => mood === moodFilter)
      )
    : markedDates;

  const calendarTheme = {
    calendarBackground: colors.blue300,
    textSectionTitleColor: colors.blue800,
    monthTextColor: colors.blue800,
    textDayHeaderFontFamily: fonts.original,
    textDayHeaderFontSize: 15,
    textMonthFontFamily: fonts.medium,
    textMonthFontSize: 24,
  };

  return (
    <View style={styles.container}>
      <Calendar
        style={styles.calendar}
        dayComponent={({ date, state }) => {
          const mood = filteredDates[date.dateString]?.mood;
          return <CustomDayComponent date={date} state={state} mood={mood} />;
        }}
        markedDates={filteredDates}
        theme={calendarTheme}
        renderArrow={(direction) =>
          direction === 'right' ? (
            <FontAwesome6 name="arrow-right" size={20} color={colors.blue900} />
          ) : (
            <FontAwesome6 name="arrow-left" size={20} color={colors.blue900} />
          )
        }
        onMonthChange={onMonthChange}
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
    width: WIDTH < 400 ? WIDTH / 14 : WIDTH / 12,
    height: HEIGHT < 800 ? HEIGHT / 23 : HEIGHT / 21,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  iconContainer: {
    marginTop: HEIGHT < 800 ? 0 : '2%',
    padding: HEIGHT < 800 ? 0 : '2%',
    marginBottom: 2,
  },
  calendar: {
    backgroundColor: colors.blue300,
    padding: HEIGHT < 800 ? 0 : '2%',
  },
});
