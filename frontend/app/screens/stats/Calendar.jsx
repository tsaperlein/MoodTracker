import React, { useState } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';

// Colors
import colors from '../../constants/colors';

// Components
import MoodCalendar from '../../components/MoodCalendar';
import InformationLabel from '../../components/InformationLabel';
import CalendarOptions from '../../components/CalendarOptions';

// Window width
import { WIDTH } from '../../constants/dimensions';

// Controller
import { useCalendarController } from '../../controllers/calendarController';

export default function Calendar() {
  const [moodFilter, setMoodFilter] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [moodCounts, setMoodCounts] = useState({});

  const { loading } = useCalendarController(currentMonth, setMoodCounts);

  const handleFilterToggle = (mood) => {
    setMoodFilter((prevMood) => (prevMood === mood ? null : mood));
  };

  const handleMonthChange = (month) => {
    setCurrentMonth(month.month);
  };

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={colors.white} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <InformationLabel text="All Welcome Moods" />
      <View style={styles.contentContainer}>
        <View style={styles.moodCalendarContainer}>
          <MoodCalendar moodFilter={moodFilter} onMonthChange={handleMonthChange} />
        </View>
        <CalendarOptions
          moodFilter={moodFilter}
          onFilterToggle={handleFilterToggle}
          moodCounts={moodCounts}
        />
      </View>
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
  contentContainer: {
    flex: 15,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  moodCalendarContainer: {
    flex: 2,
    width: WIDTH < 400 ? '90%' : '100%',
  },
  loading: {
    flex: 1,
    backgroundColor: colors.blue900,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
