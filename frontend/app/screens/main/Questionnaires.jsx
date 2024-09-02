import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
  Animated,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';

// Colors
import colors from '../../constants/colors';
// Fonts
import fonts from '../../constants/fonts';

// Layout
import ScreenLayout from '../Layout';

// Components
import PreviousSurvey from '../../components/PreviousSurvey';

// Window height
import { HEIGHT } from '../../constants/dimensions';

// Controller
import useQuestionnairesController from '../../controllers/questionnairesController';

export default function Questionnaires({ navigation }) {
  const {
    scrollY,
    surveys,
    loading,
    height,
    marginBottom,
    width,
    borderRadius,
    formatDateToLongForm,
    calculateTimeDifference,
    getSurveyGroupLabel,
    refreshing,
    onRefresh,
  } = useQuestionnairesController();

  return (
    <ScreenLayout footer={true}>
      <View style={styles.container}>
        <Animated.View
          style={{
            height,
            width,
            marginBottom,
            overflow: 'hidden',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius,
          }}
        >
          <TouchableHighlight
            style={styles.imageContainer}
            onPress={() => navigation.navigate('Survey Navigator', { mode: 'current' })}
          >
            <View style={styles.imageContainer}>
              <Image
                style={styles.image}
                source={require('../../assets/images/todaysSurvey-4.png')}
              />
              <Animated.View style={styles.dailySurveyContainer}>
                <Text style={styles.dailySurveyText}>Today's Survey</Text>
              </Animated.View>
            </View>
          </TouchableHighlight>
        </Animated.View>
        {loading ? (
          <View style={styles.activityIndicatorStyle}>
            <ActivityIndicator size="large" color={colors.blue900} />
          </View>
        ) : surveys.length === 0 ? (
          <View style={styles.noSurveysContainer}>
            <Text style={styles.noSurveysText}>No previous surveys</Text>
          </View>
        ) : (
          <Animated.ScrollView
            style={{ flex: 1, width: '100%' }}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
              useNativeDriver: false,
            })}
            scrollEventThrottle={20}
          >
            {surveys.map((surveyGroup, index) => (
              <View key={index} style={{ marginBottom: '1%' }}>
                <Text style={styles.surveysLabel}>{getSurveyGroupLabel(surveyGroup)}</Text>
                {surveyGroup.versions.map((survey, idx) => (
                  <PreviousSurvey
                    key={idx}
                    navigation={navigation}
                    postedAt={formatDateToLongForm(survey.posted_at)}
                    completionTime={calculateTimeDifference(
                      survey.posted_at,
                      survey.completion_time
                    )}
                    surveyId={survey.id}
                  />
                ))}
              </View>
            ))}
          </Animated.ScrollView>
        )}
      </View>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    margin: '2%',
    alignItems: 'center',
  },
  imageContainer: {
    width: '100%',
    height: '100%',
  },
  image: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    resizeMode: 'cover',
  },
  dailySurveyContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dailySurveyText: {
    color: colors.white,
    fontSize: HEIGHT < 800 ? 40 : 45,
    fontFamily: fonts.fjalla,
  },
  surveysLabel: {
    color: colors.blue700,
    fontSize: 21,
    margin: '2%',
    fontFamily: fonts.bold,
    textAlign: 'center',
  },
  activityIndicatorStyle: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noSurveysContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noSurveysText: {
    color: colors.blue200,
    fontSize: 26,
    fontFamily: fonts.bold,
    textAlign: 'center',
  },
});
