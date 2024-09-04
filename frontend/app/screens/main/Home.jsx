import React from 'react';
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
  const { moodLevel, surveyCompleted } = useHomeController();
  const { data, loading } = useGraphData({ screen: 'Home' });

  return (
    <ScreenLayout screenName={'Home'} footer={true}>
      <ScrollView contentContainerStyle={styles.container} scrollEnabled={false}>
        <View style={[styles.content, { padding: '5%', paddingVertical: '2%' }]}>
          <Message category={moodLevel} surveyCompleted={surveyCompleted} />
        </View>
        <View style={[styles.content, { paddingVertical: '2%' }]}>
          <WeeklyStats
            action={() => navigation.navigate('Stats Navigator', { screen: 'Calendar' })}
          />
        </View>
        <View style={[styles.content, { paddingVertical: '3%', flexDirection: 'row' }]}>
          <View style={styles.contentContainer}>
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
            ) : surveyCompleted ? (
              <View style={styles.noSurveysContainer}>
                <Text style={styles.noSurveysText}>
                  Today's survey completed!{'\n'}
                  Need more to get results.
                </Text>
              </View>
            ) : (
              <View style={styles.noSurveysContainer}>
                <Text style={styles.noSurveysText}>No answered surveys</Text>
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
