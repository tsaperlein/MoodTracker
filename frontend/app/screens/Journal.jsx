import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Journal = () => {
  return (
    <View style={styles.container}>
      <Text>Journal</Text>
    </View>
  );
};

export default Journal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
