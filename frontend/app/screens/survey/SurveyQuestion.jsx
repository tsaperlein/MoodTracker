// SurveyQuestion.js
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Platform, Alert } from 'react-native';

// Colors
import colors from '../../config/colors';

// Components
import EmojiSelector from '../../components/EmojiSelector';
import KeyWordSelector from '../../components/KeyWordSelector';
import SurveyButtons from '../../components/SurveyButtons';
import ScreenLayout from '../Layout';

// Mock data import
import { surveyAnswers } from '../../assets/mockData';

const emojiMap = ['awful', 'sad', 'neutral', 'good', 'happy'];

export default function SurveyQuestion({ navigation, number, totalQuestions, questionText, mode }) {
  const [emojiSelected, setEmojiSelected] = useState(null);
  const [comment, setComment] = useState('');
  const [keywords, setKeywords] = useState([]);

  const handleSkip = () => {
    Alert.alert(
      'Skip Question',
      'Are you sure you want to skip this question?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Skip',
          onPress: () =>
            navigation.navigate(number < totalQuestions ? `Q${number + 1}` : 'Completion'),
        },
      ],
      { cancelable: false }
    );
  };

  useEffect(() => {
    if (mode === 'past') {
      const answer = surveyAnswers[number];
      if (answer) {
        setEmojiSelected(emojiMap[answer.emoji - 1]);
        setComment(answer.comment);
        setKeywords(answer.keywords);
      }
    }
  }, [mode, number]);

  return (
    <ScreenLayout footer={false} backgroundColor={colors.blue900}>
      <View style={{ width: '100%', height: '100%' }}>
        <View style={styles.questionTitleContainer}>
          <Text style={styles.questionTitle}>Question {number}</Text>
        </View>
        <View style={{ flex: 11 / 15, alignItems: 'center', justifyContent: 'center' }}>
          <View style={[{ flex: 1 / 6 }, styles.field]}>
            <Text style={styles.questionText}>{questionText}</Text>
          </View>
          <View style={[{ flex: 1 / 6, backgroundColor: colors.blue800a70 }, styles.field]}>
            <EmojiSelector
              setEmojiSelected={setEmojiSelected}
              initialMood={emojiSelected}
              disabled={mode === 'past'}
            />
          </View>
          <View style={[{ flex: 2 / 6 }, styles.field]}>
            <KeyWordSelector
              initialKeywords={keywords}
              setSelectedKeywords={setKeywords}
              disabled={mode === 'past'}
            />
          </View>
          <View style={[{ flex: 2 / 6 }, styles.field]}>
            <View style={styles.input}>
              {mode === 'current' ? (
                <TextInput
                  style={styles.inputStyle}
                  placeholder="Comment freely..."
                  placeholderTextColor={colors.blue400a70}
                  autoCapitalize="none"
                  multiline={true}
                  numberOfLines={10}
                  maxLength={1000}
                  value={comment}
                  onChangeText={setComment}
                />
              ) : (
                <Text style={styles.answerText}>{comment}</Text>
              )}
            </View>
          </View>
        </View>
        <SurveyButtons
          navigation={navigation}
          number={number}
          totalQuestions={totalQuestions}
          mode={mode}
          emojiSelected={emojiSelected}
          handleSkip={handleSkip}
        />
      </View>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  questionText: {
    color: colors.blue300,
    fontSize: 20,
    fontFamily: Platform.OS === 'ios' ? 'outfitBold' : 'robotoBold',
    textAlign: 'justify',
  },
  field: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  questionTitleContainer: {
    flex: 1 / 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.blue800,
  },
  questionTitle: {
    color: colors.blue400,
    fontSize: 20,
    fontFamily: Platform.OS === 'ios' ? 'outfit' : 'robotoBold',
  },
  input: {
    flex: 1,
    width: '90%',
    padding: '3%',
    borderRadius: 10,
    backgroundColor: colors.blue800a50,
    fontFamily: Platform.OS === 'ios' ? 'outfit' : 'robotoBold',
    fontSize: 15,
    borderWidth: 2,
    borderColor: colors.purple400,
  },
  inputStyle: {
    height: '100%',
    width: '100%',
    textAlignVertical: 'top',
    paddingTop: 0,
    paddingBottom: 0,
    color: colors.blue300,
    fontSize: 18,
    fontFamily: Platform.OS === 'ios' ? 'outfit' : 'robotoBold',
  },
  answerText: {
    color: colors.blue300,
    fontSize: 18,
    fontFamily: Platform.OS === 'ios' ? 'outfit' : 'robotoBold',
  },
});
