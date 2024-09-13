import React, { useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';

// Colors
import colors from '../../constants/colors';
// Fonts
import fonts from '../../constants/fonts';

// Layout
import ScreenLayout from '../Layout';

// Components
import WeeklyStats from '../../components/WeeklyStats';
import MonthlyStats from '../../components/MonthlyStats';
import Message from '../../components/Message';
import EmotionLegend from '../../components/EmotionLegend';
import Button from '../../components/Button';

// Controllers
import { useGraphData } from '../../controllers/graphController';
import { useHomeController } from '../../controllers/homeController';

export default function Home({ navigation }) {
  const { moodLevel, dailySurveyCompleted, remainingVersions } = useHomeController();
  const { data, loading } = useGraphData({ screen: 'Home' });

  const informationText =
    remainingVersions === 1 ? '1 more survey' : `${remainingVersions} more surveys`;

  return (
    <ScreenLayout screenName={'Home'} footer={true}>
      <ScrollView contentContainerStyle={styles.container} scrollEnabled={false}>
        <View style={[styles.content, { paddingHorizontal: '5%' }]}>
          <Message
            category={moodLevel}
            dailySurveyCompleted={dailySurveyCompleted}
            remainingVersions={remainingVersions}
          />
        </View>
        <View style={styles.content}>
          <WeeklyStats
            action={() => navigation.navigate('Stats Navigator', { screen: 'Calendar' })}
          />
        </View>
        <View style={[styles.content, { paddingVertical: '3%', flexDirection: 'row' }]}>
          <View
            style={[
              styles.contentContainer,
              { backgroundColor: data.length > 0 ? colors.blue700 : colors.blue500a50 },
            ]}
          >
            {data && data.length > 0 ? (
              <>
                <TouchableOpacity
                  style={{ flex: 2, width: '100%' }}
                  onPress={() =>
                    navigation.navigate('Stats Navigator', {
                      screen: 'Graph',
                    })
                  }
                >
                  <MonthlyStats data={data} loading={loading} />
                </TouchableOpacity>
                <View style={{ flex: 1, width: '100%' }}>
                  <EmotionLegend
                    backgroundColor={colors.blue800}
                    justifyContent="flex-start"
                    marginHorizontal="10"
                  />
                </View>
              </>
            ) : dailySurveyCompleted ? (
              <View style={styles.noSurveysContainer}>
                <Text style={styles.dailySurveyCompletedText}>Today's survey completed!</Text>
                <Text style={styles.remainingVersionsText}>
                  You need {informationText} to get results.
                </Text>
              </View>
            ) : (
              <View style={styles.noSurveysContainer}>
                <Text style={styles.noSurveysText}>No answered surveys</Text>
                <Button
                  buttonColor={colors.blue400}
                  padding={16}
                  text="Complete today's survey"
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
      </ScrollView>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    width: '100%',
    resizeMode: 'cover',
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: '2%',
  },
  content: {
    flex: 1,
    width: '100%',
    paddingVertical: '2%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
    height: '100%',
    margin: '2%',
    backgroundColor: colors.blue500a50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    overflow: 'hidden',
  },
  streakContainer: {
    position: 'absolute',
    backgroundColor: 'rgba(255,255,255,0.4)',
    marginTop: '10%',
    padding: '5%',
    borderRadius: 20,
  },
  noSurveysContainer: {
    height: '100%',
    padding: '3%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  noSurveysText: {
    color: colors.blue200,
    fontSize: 26,
    fontFamily: fonts.bold,
    textAlign: 'center',
  },
  dailySurveyCompletedText: {
    fontSize: 24,
    fontFamily: fonts.bold,
    color: colors.blue200,
    textAlign: 'center',
  },
  remainingVersionsText: {
    color: colors.blue700a70,
    fontSize: 22,
    fontFamily: fonts.bold,
    textAlign: 'center',
  },
});
