import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Diary() {
  return (
    <View style={styles.container}>
      <Text>Diary</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gray',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
