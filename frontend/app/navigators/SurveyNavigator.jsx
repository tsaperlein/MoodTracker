import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';

// Colors
import colors from '../constants/colors';
// Fonts
import fonts from '../constants/fonts';

// Screens
import AppLoading from '../screens/extras/AppLoading';
import NoSurvey404 from '../screens/extras/NoSurvey404';

// Components
import SurveyQuestion from '../screens/survey/SurveyQuestion';
import CompletionAnimation from '../screens/extras/Completion';
import GoBackButton from '../components/GoBackButton';

// Navigation
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

// Authorization Services
import { AuthContext } from 'context/AuthContext';

// Controller
import { useSurveyController } from '../controllers/surveyController';

export default function SurveyNavigator({ route, navigation }) {
  const { mode, surveyId = null } = route.params;
  const { authData } = useContext(AuthContext);
  const {
    questions,
    loading,
    formattedDate,
    answers,
    handleAnswerUpdate,
    handleSubmit,
    surveyScore,
    isNextSurveyReady,
  } = useSurveyController(authData, mode, surveyId);

  if (loading) return <AppLoading backgroundColor={colors.blue900} mode="light" />;

  return mode === 'current' && isNextSurveyReady ? (
    <NoSurvey404 />
  ) : (
    <Stack.Navigator
      initialRouteName="Q1"
      screenOptions={{
        headerTitle: formattedDate,
        animationEnabled: false,
        headerTransparent: true,
        headerTitleAlign: 'center',
        headerBackTitleVisible: false,
        headerTintColor: colors.blue400,
        headerTitleStyle: {
          fontSize: 20,
          fontFamily: fonts.bold,
        },
        headerRight: () =>
          mode === 'past' && (
            <View style={styles.scoreContainer}>
              <Text style={styles.scoreText}>{`${surveyScore} points`}</Text>
            </View>
          ),
      }}
    >
      {questions.map((question, index) => {
        const buttonMode = index === 0 ? 'close' : 'back';
        return (
          <Stack.Screen
            key={index}
            name={`Q${index + 1}`}
            options={{
              headerLeft: () => <GoBackButton mode={buttonMode} />,
            }}
          >
            {(props) => (
              <SurveyQuestion
                {...props}
                number={index + 1}
                totalQuestions={questions.length}
                question={question}
                mode={mode}
                answers={answers}
                onAnswerUpdate={handleAnswerUpdate}
                onSubmit={() => handleSubmit(navigation)}
              />
            )}
          </Stack.Screen>
        );
      })}
      <Stack.Screen
        name="Completion"
        options={{ headerShown: false }}
        component={CompletionAnimation}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  scoreContainer: {
    backgroundColor: colors.blue700,
    padding: 10,
    borderRadius: 10,
  },
  scoreText: {
    color: colors.blue100,
    fontSize: 16,
    fontFamily: fonts.bold,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: colors.blue900,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    alignSelf: 'center',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    color: colors.blue300,
    fontSize: 20,
    fontFamily: fonts.bold,
  },
});
