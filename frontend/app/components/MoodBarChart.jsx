import React from 'react';
import { View, Dimensions, Text, StyleSheet } from 'react-native';

// Colors
import colors from '../config/colors';
// Fonts
import fonts from '../config/fonts';

// Components
import { BarChart } from 'react-native-gifted-charts';

// Utilities
import { getRatioOutcome } from '../utils/ratioUtils';

// Bar width and height
const barWidth = (Dimensions.get('window').width * 0.7) / 7 - 14;
const height = (Dimensions.get('window').height * 30) / 100;

export default function MoodBarChart({ data }) {
  return (
    <BarChart
      height={height}
      maxValue={26}
      data={data}
      yAxisThickness={0}
      xAxisThickness={0}
      hideYAxisText
      hideRules
      barWidth={barWidth}
      barInnerComponent={(item) => (
        <View
          style={[
            styles.textContainer,
            {
              backgroundColor: getRatioOutcome(item.value, 26, 'color'),
            },
          ]}
        >
          <Text style={styles.text}>{item.value}</Text>
        </View>
      )}
      roundedTop
      roundedBottom
      disablePress
      disableScroll={false}
      xAxisLabelTextStyle={styles.xAxisLabelTextStyle}
      rotateLabel={true}
    />
  );
}

const styles = StyleSheet.create({
  textContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 20,
    paddingTop: '20%',
  },
  text: {
    color: colors.black,
    fontSize: 20,
    fontFamily: 'outfitMedium',
  },
  xAxisLabelTextStyle: {
    color: colors.white,
    fontSize: 11,
    fontFamily: fonts.medium,
  },
});
