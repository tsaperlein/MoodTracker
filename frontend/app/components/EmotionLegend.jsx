import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

// Colors
import colors from '../config/colors';
// Fonts
import fonts from '../config/fonts';
// Icons
import { FontAwesome6, MaterialIcons } from '@expo/vector-icons';

// Mood Configuration
import { moodConfig } from '../config/moodConfig';

const renderLegendIcon = (mood, marginHorizontal) => {
  const IconComponent =
    moodConfig[mood].icon === 'face-retouching-off' ? MaterialIcons : FontAwesome6;

  return (
    <IconComponent
      name={moodConfig[mood].icon}
      size={20}
      color={moodConfig[mood].general.color}
      style={{ marginHorizontal: `${marginHorizontal}%` }}
    />
  );
};

export default function EmotionLegend({
  backgroundColor = colors.blue800,
  justifyContent = 'center',
  marginHorizontal = '5',
}) {
  const moodKeys = Object.keys(moodConfig).slice(1);

  return (
    <View style={[styles.legendContainer, { backgroundColor, justifyContent }]}>
      {moodKeys.map((mood, index) => (
        <View key={`${mood}-${index}`} style={styles.legendItem}>
          {renderLegendIcon(mood, marginHorizontal)}
          <Text style={{ color: moodConfig[mood].general.color, fontFamily: fonts.bold }}>
            {`${mood.charAt(0).toUpperCase() + mood.slice(1)}`}
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  legendContainer: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'center',
    flexWrap: 'wrap',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '2%',
  },
});
