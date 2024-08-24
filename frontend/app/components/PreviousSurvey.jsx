import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';

// Colors
import colors from '../config/colors';
// Fonts
import fonts from '../config/fonts';

// Window Height
const height = Dimensions.get('window').height;

export default function PreviousSurvey({ navigation, date, surveyId }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Survey Navigator', { mode: 'past', surveyId })}
      >
        <Text style={styles.label}>{date}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: height / 14,
    marginVertical: '1%',
  },
  button: {
    flex: 1,
    backgroundColor: colors.blue300a50,
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginHorizontal: '2%',
    padding: '3%',
    borderRadius: 20,
    overflow: 'hidden',
  },
  label: {
    color: colors.blue100,
    fontSize: 19,
    fontFamily: fonts.medium,
  },
});
