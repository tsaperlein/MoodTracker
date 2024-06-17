import React from 'react';
import { StyleSheet, Text, View, Dimensions, Platform } from 'react-native';

// Colors
import colors from '../../config/colors';

// Components
import ScreenLayout from '../Layout';

export default function Home() {
  return (
    <ScreenLayout footer={true}>
      <Text>Home</Text>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({});
