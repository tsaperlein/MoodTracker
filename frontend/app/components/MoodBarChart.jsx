import React, { useState, useEffect } from 'react';
import { View, Dimensions } from 'react-native';

// Colors
import colors from '../config/colors';
// Icons
import { FontAwesome6, MaterialIcons } from '@expo/vector-icons';
// Mood Config
import moodConfig from '../config/moodConfig';

// Components
import { BarChart } from 'react-native-gifted-charts';

export default function MoodBarChart({ data }) {
  const barWidth = (Dimensions.get('window').width * 0.6) / 7 - 7;

  const height = (Dimensions.get('window').height * 30) / 100;

  return (
    <BarChart
      height={height}
      maxValue={5}
      data={data}
      yAxisThickness={0}
      xAxisThickness={0}
      hideYAxisText
      hideRules
      barWidth={barWidth}
      barInnerComponent={(item) => {
        const mood = Object.values(moodConfig).find((m) => m.value === item.value);
        return (
          <View
            style={{
              flex: 1,
              width: '100%',
              justifyContent: 'flex-start',
              alignItems: 'center',
              backgroundColor: mood ? mood.backgroundColor : 'transparent',
              borderRadius: 20,
              paddingTop: '10%',
            }}
          >
            {mood && mood.icon !== 'face-retouching-off' ? (
              <FontAwesome6 name={mood.icon} size={barWidth / 1.2} color={mood.color} />
            ) : (
              <MaterialIcons
                name={'face-retouching-off'}
                size={barWidth / 1.2}
                color={mood.color}
              />
            )}
          </View>
        );
      }}
      roundedTop
      roundedBottom
      xAxisLabelTextStyle={{ color: colors.blue200, fontFamily: 'outfitBold' }}
      disablePress
      disableScroll={false}
    />
  );
}
