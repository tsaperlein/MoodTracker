import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

// Colors
import colors from '../config/colors';
// Fonts
import fonts from '../config/fonts';

export default function InformationLabel({ text }) {
  return (
    <View style={styles.labelContainer}>
      <Text style={styles.label}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  labelContainer: {
    flex: 1,
    paddingHorizontal: '3%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.blue900a50,
    marginBottom: '2%',
    borderRadius: 10,
  },
  label: {
    fontSize: 19,
    color: colors.blue300,
    fontFamily: fonts.bold,
  },
});
