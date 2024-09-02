import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Colors
import colors from '../constants/colors';
// Fonts
import fonts from '../constants/fonts';

// Components
import { BarChart } from 'react-native-gifted-charts';

// Utilities
import { getRatioOutcome } from '../utilities/ratio';

// Window width and height
import { HEIGHT, WIDTH } from '../constants/dimensions';

// Bar width and height
const barWidth = WIDTH < 400 ? (WIDTH * 0.7) / 7 - 16 : (WIDTH * 0.7) / 7 - 14;
const barChartHeight = HEIGHT < 800 ? (HEIGHT * 28) / 100 : (HEIGHT * 30) / 100;

export default function MoodBarChart({ data }) {
  return (
    <BarChart
      height={barChartHeight}
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
    fontFamily: fonts.medium,
  },
  xAxisLabelTextStyle: {
    color: colors.white,
    fontSize: HEIGHT < 800 ? 9 : 10,
    fontFamily: fonts.medium,
  },
});
