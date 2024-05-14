import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function AddNote() {
  return (
    <View style={styles.container}>
      <Text>AddNote</Text>
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
