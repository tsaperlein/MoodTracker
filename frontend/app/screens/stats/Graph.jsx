import React from 'react';
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native';

// Colors
import colors from '../../constants/colors';
// Fonts
import fonts from '../../constants/fonts';

// Components
import MoodBarChart from '../../components/MoodBarChart';
import MoodPieChart from '../../components/MoodPieChart';
import EmotionLegend from '../../components/EmotionLegend';
import InformationLabel from '../../components/InformationLabel';
import Button from '../../components/Button';

// Navigation
import { useNavigation } from '@react-navigation/native';

// Controller
import { useGraphData } from '../../controllers/graphController';

export default function Graph() {
  const { data, loading } = useGraphData({ screen: 'Graph' });
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <InformationLabel text="All surveys" />
      <View style={styles.contentContainer}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.white} />
          </View>
        ) : data && data.length > 0 ? (
          <View style={{ flex: 1, width: '100%' }}>
            <View style={{ flex: 1 }}>
              <MoodBarChart data={data} />
            </View>
            <View style={{ flex: 1 }}>
              <MoodPieChart data={data} />
              <EmotionLegend />
            </View>
          </View>
        ) : (
          <View style={styles.noSurveysContainer}>
            <Text style={styles.noSurveysText}>You need 3 completed surveys</Text>
            <Button
              buttonColor={colors.blue400}
              padding={16}
              text="Complete a survey"
              color={colors.blue100}
              borderRadius={20}
              fontSize={20}
              fontFamily={fonts.bold}
              action={() => navigation.navigate('Questionnaires')}
            />
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    padding: '4%',
    paddingBottom: '6%',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.blue900,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 15,
    width: '100%',
    backgroundColor: colors.blue800a50,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  noSurveysContainer: {
    flex: 1,
    width: '90%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  noSurveysText: {
    color: colors.blue200,
    fontSize: 26,
    fontFamily: fonts.bold,
    textAlign: 'center',
  },
});
