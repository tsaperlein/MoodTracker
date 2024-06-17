import React from 'react';
import { StyleSheet, Text, View, Dimensions, Platform } from 'react-native';

// Colors
import colors from '../../config/colors';

// Components
import ScreenLayout from '../Layout';

export default function Statistics() {
  return (
    <ScreenLayout footer={true}>
      <Text>Statistics</Text>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({});
