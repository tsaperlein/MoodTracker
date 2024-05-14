import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import MainNavigator from './app/navigation/MainNavigator';

export default function App() {
  return <MainNavigator />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
