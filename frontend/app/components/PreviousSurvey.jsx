import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Platform } from 'react-native';

// Colors
import colors from '../config/colors';

export default function PreviousSurvey({ navigation, date }) {
  return (
    <View style={{ height: 70, marginVertical: '1%' }}>
      <TouchableOpacity
        style={styles.container}
        onPress={() => navigation.navigate("Today's Survey", { mode: 'past' })}
      >
        <Text style={styles.labelStyle}>{date}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: '3%',
    overflow: 'hidden',
    backgroundColor: colors.blue600a50,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  labelStyle: {
    color: colors.blue100,
    fontSize: 20,
    fontFamily: Platform.OS === 'ios' ? 'outfitMedium' : 'robotoBold',
  },
});
