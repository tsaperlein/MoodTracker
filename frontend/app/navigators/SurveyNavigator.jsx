import React from 'react';
import { StyleSheet, TouchableOpacity, Platform } from 'react-native';

// Colors
import colors from '../config/colors';
// Icons
import { Ionicons } from '@expo/vector-icons';

// Navigation
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

// Components
import SurveyQuestion from '../screens/survey/SurveyQuestion';
import CompletionAnimation from '../screens/extras/Completion';

const headerOptions = {
  headerTitle: '12th of October',
  animationEnabled: false,
  headerTransparent: true,
  headerBackTitleVisible: false,
  headerTintColor: colors.blue400,
  headerTitleStyle: {
    fontSize: 20,
    fontFamily: Platform.OS === 'ios' ? 'outfitBold' : 'robotoBold',
  },
};

const CloseButton = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity style={{ position: 'absolute' }} onPress={() => navigation.goBack()}>
      <Ionicons name="close" size={30} color={colors.blue300} />
    </TouchableOpacity>
  );
};

const BackButton = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity style={{ position: 'absolute' }} onPress={() => navigation.goBack()}>
      <Ionicons name="arrow-back" size={30} color={colors.blue300} />
    </TouchableOpacity>
  );
};

const initialList = [
  {
    id: '1',
    question: 'How was your time until now?',
    comment: 'Feeling great, no problem at all',
  },
  {
    id: '2',
    question: 'Did you accomplish any new goals?',
    comment: 'Feeling great, no problem at all',
  },
  {
    id: '3',
    question: 'How exhausted and sad are you feeling?',
    comment: 'Feeling great, no problem at all',
  },
  {
    id: '4',
    question: 'Any more motivation for the rest of the day?',
    comment: 'Feeling great, no problem at all',
  },
];

export default function SurveyNavigator() {
  const totalQuestions = initialList.length;
  return (
    <Stack.Navigator initialRouteName="Q1" screenOptions={headerOptions}>
      {initialList.map((item, index) => (
        <Stack.Screen
          key={item.id}
          name={`Q${item.id}`}
          options={{
            headerLeft: () => (item.id === '1' ? <CloseButton /> : <BackButton />),
          }}
        >
          {(props) => (
            <SurveyQuestion
              {...props}
              number={index + 1}
              totalQuestions={totalQuestions}
              questionText={item.question}
            />
          )}
        </Stack.Screen>
      ))}
      <Stack.Screen
        name="Completion"
        options={{ headerShown: false }}
        component={CompletionAnimation}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create();
