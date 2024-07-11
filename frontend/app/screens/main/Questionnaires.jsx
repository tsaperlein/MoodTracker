import React, { useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
  Platform,
  Animated,
} from 'react-native';

// Colors
import colors from '../../config/colors';

// Components
import ScreenLayout from '../Layout';
import PreviousSurvey from '../../components/PreviousSurvey';

export default function Questionnaires({ navigation }) {
  const scrollY = useRef(new Animated.Value(0)).current;

  const height = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: ['25%', '10%'],
    extrapolate: 'clamp',
  });

  const marginBottom = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: ['3%', '0%'],
    extrapolate: 'clamp',
  });

  const width = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: ['90%', '100%'],
    extrapolate: 'clamp',
  });

  const borderRadius = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: ['40', '0'],
    extrapolate: 'clamp',
  });

  const surveys = [
    { weekText: 'This week', date: 'Thursday, 13th of June' },
    { weekText: 'This week', date: 'Friday, 14th of June' },
    { weekText: 'This week', date: 'Saturday, 15th of June' },
    { weekText: 'This week', date: 'Sunday, 16th of June' },
    { weekText: 'Previous week', date: 'Thursday, 6th of June' },
    { weekText: 'Previous week', date: 'Friday, 7th of June' },
    { weekText: 'Two weeks ago', date: 'Saturday, 1st of June' },
    { weekText: 'Two weeks ago', date: 'Sunday, 2nd of June' },
    { weekText: 'This week', date: 'Thursday, 13th of June' },
    { weekText: 'This week', date: 'Friday, 14th of June' },
    { weekText: 'This week', date: 'Saturday, 15th of June' },
    { weekText: 'This week', date: 'Sunday, 16th of June' },
    { weekText: 'Previous week', date: 'Thursday, 6th of June' },
    { weekText: 'Previous week', date: 'Friday, 7th of June' },
    { weekText: 'Two weeks ago', date: 'Saturday, 1st of June' },
    { weekText: 'Two weeks ago', date: 'Sunday, 2nd of June' },
    { weekText: 'This week', date: 'Thursday, 13th of June' },
    { weekText: 'This week', date: 'Friday, 14th of June' },
    { weekText: 'This week', date: 'Saturday, 15th of June' },
    { weekText: 'This week', date: 'Sunday, 16th of June' },
  ];

  const groupSurveysByWeek = (surveys) => {
    return surveys.reduce((groups, survey) => {
      const week = survey.weekText;
      if (!groups[week]) {
        groups[week] = [];
      }
      groups[week].push(survey);
      return groups;
    }, {});
  };

  const surveyGroups = groupSurveysByWeek(surveys);

  return (
    <ScreenLayout footer={true}>
      <View style={styles.container}>
        <Animated.View
          style={{
            height: height,
            width: width,
            marginBottom: marginBottom,
            borderRadius: borderRadius,
            overflow: 'hidden',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <TouchableHighlight
            style={{ width: '100%', height: '100%' }}
            onPress={() => navigation.navigate("Today's Survey", { mode: 'current' })}
          >
            <View style={{ width: '100%', height: '100%' }}>
              <Image
                style={{
                  height: '100%',
                  width: '100%',
                  position: 'absolute',
                  resizeMode: 'cover',
                }}
                source={require('../../assets/images/todaysSurvey.png')}
              />
              <Animated.View
                style={{
                  width: '100%',
                  height: '100%',
                  backgroundColor: 'rgba(0,0,0,0.3)',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Text
                  style={{
                    color: colors.blue200,
                    fontSize: 26,
                    fontFamily: Platform.OS === 'ios' ? 'outfitMedium' : 'robotoBold',
                  }}
                >
                  Today's Survey
                </Text>
              </Animated.View>
            </View>
          </TouchableHighlight>
        </Animated.View>
        <Animated.ScrollView
          style={{ flex: 0.8, backgroundColor: colors.blue500a50, width: '100%' }}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
            useNativeDriver: false,
          })}
          scrollEventThrottle={16}
        >
          {Object.keys(surveyGroups).map((week, index) => (
            <View key={index} style={{ marginBottom: '2%' }}>
              <Text
                style={{
                  color: colors.blue900,
                  fontSize: 18,
                  margin: '2%',
                  fontFamily: Platform.OS === 'ios' ? 'outfitMedium' : 'robotoBold',
                }}
              >
                {week}
              </Text>
              {surveyGroups[week].map((survey, idx) => (
                <PreviousSurvey
                  key={idx}
                  weekText={survey.weekText}
                  navigation={navigation}
                  date={survey.date}
                />
              ))}
            </View>
          ))}
        </Animated.ScrollView>
      </View>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    margin: '1%',
    alignItems: 'center',
  },
});
