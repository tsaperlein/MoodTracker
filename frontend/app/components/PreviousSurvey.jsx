import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Platform } from 'react-native';

// Colors
import colors from '../config/colors';

export default function PreviousSurvey({ date }) {
  return (
    <View style={{ height: 70, marginVertical: '1%' }}>
      <TouchableOpacity
        style={{
          flex: 1,
          padding: '3%',
          overflow: 'hidden',
          backgroundColor: colors.blue500a70,
          alignItems: 'flex-start',
          justifyContent: 'center',
        }}
      >
        <Text
          style={{
            color: colors.blue900,
            fontSize: 20,
            fontFamily: Platform.OS === 'ios' ? 'outfitMedium' : 'robotoBold',
          }}
        >
          {date}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({});
