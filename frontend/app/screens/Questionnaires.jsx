import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

export default function Questionnaires() {
  return (
    <View style={styles.container}>
      <Text>Questionnaires</Text>
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
