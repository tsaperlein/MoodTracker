import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

// Colors
import colors from '../constants/colors';
// Fonts
import fonts from '../constants/fonts';
// Icons
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Window Height
import { HEIGHT } from '../constants/dimensions';

export default function PreviousSurvey({
  navigation,
  postedAt,
  completionTime = '1d 2h',
  surveyId,
}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Survey Navigator', { mode: 'past', surveyId })}
      >
        <View style={styles.postedAtContainer}>
          <Text style={styles.postedAt}>{postedAt}</Text>
        </View>
        <View style={styles.rightSideContainer}>
          <View style={styles.completedTimeContainer}>
            <MaterialCommunityIcons name="timer-sand-complete" size={24} color={colors.blue600} />
            <Text style={styles.completedTime}>{completionTime}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: HEIGHT / 14,
    marginVertical: '1%',
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: colors.blue300a50,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: '2%',
    padding: '3%',
    borderRadius: 20,
    overflow: 'hidden',
  },
  postedAtContainer: {
    flex: 1,
  },
  postedAt: {
    color: colors.blue100,
    fontSize: 19,
    fontFamily: fonts.medium,
  },
  rightSideContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  completedTimeContainer: {
    backgroundColor: colors.blue300,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: '2%',
    paddingHorizontal: '4%',
    borderRadius: 10,
  },
  completedTime: {
    color: colors.blue600,
    fontSize: 18,
    fontFamily: fonts.medium,
  },
});
