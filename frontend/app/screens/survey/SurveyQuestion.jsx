import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';

// Colors
import colors from '../../constants/colors';
// Border
import { border } from '../../config/borderConfig';
// Fonts
import fonts from '../../constants/fonts';

// Layout
import ScreenLayout from '../Layout';

// Components
import AnswerSelector from '../../components/AnswerSelector';
import SurveyButtons from '../../components/SurveyButtons';

export default function SurveyQuestion({
  navigation,
  number,
  totalQuestions,
  question,
  mode,
  onAnswerUpdate,
  onSubmit,
}) {
  const [comment, setComment] = useState(question.comment || '');
  const [selectedAnswer, setSelectedAnswer] = useState(question.type || null);

  useEffect(() => {
    setComment(question.comment || '');
    setSelectedAnswer(question.type || null);
  }, [question]);

  const handleSelect = (answer) => {
    setSelectedAnswer(answer);
    onAnswerUpdate(question.id, answer, comment);
  };

  useEffect(() => {
    onAnswerUpdate(question.id, selectedAnswer, comment);
  }, [comment, selectedAnswer]);

  return (
    <ScreenLayout footer={false} backgroundColor={colors.blue900}>
      <View style={{ width: '100%', height: '100%' }}>
        <View style={styles.questionTitleContainer}>
          <Text style={styles.questionTitle}>Question {number}</Text>
        </View>
        <View style={styles.topContainer}>
          <View style={[{ flex: 1 }, styles.field]}>
            <Text style={styles.questionText}>{question.text}</Text>
          </View>
          <View style={[{ flex: 1, backgroundColor: colors.blue800a70 }, styles.field]}>
            <View style={styles.optionsContainer}>
              <AnswerSelector
                text="Not True"
                selected={selectedAnswer === 'Not True'}
                onPress={() => handleSelect('Not True')}
                disabled={mode === 'past'}
              />
              <AnswerSelector
                text="Sometimes"
                selected={selectedAnswer === 'Sometimes'}
                onPress={() => handleSelect('Sometimes')}
                disabled={mode === 'past'}
              />
              <AnswerSelector
                text="True"
                selected={selectedAnswer === 'True'}
                onPress={() => handleSelect('True')}
                disabled={mode === 'past'}
              />
            </View>
          </View>
          <View style={[{ flex: 3, paddingTop: '5%' }, styles.field]}>
            <View style={[styles.input, border(2)]}>
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
          answerSelected={selectedAnswer}
          onSubmit={onSubmit}
        />
      </View>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  questionText: {
    color: colors.blue300,
    fontSize: 20,
    fontFamily: fonts.medium,
    textAlign: 'justify',
    marginHorizontal: '5%',
  },
  field: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  questionTitleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.blue800a70,
  },
  questionTitle: {
    color: colors.blue500,
    fontSize: 20,
    fontFamily: fonts.bold,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
  },
  topContainer: {
    flex: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    flex: 1,
    width: '90%',
    padding: '3%',
    borderRadius: 10,
    backgroundColor: colors.blue800a50,
    fontFamily: fonts.original,
    fontSize: 15,
    borderColor: colors.purple400,
  },
  inputStyle: {
    height: '100%',
    width: '100%',
    verticalAlign: 'top',
    paddingTop: 0,
    paddingBottom: 0,
    color: colors.blue300,
    fontSize: 18,
    fontFamily: fonts.original,
  },
  answerText: {
    color: colors.blue300,
    fontSize: 18,
    fontFamily: fonts.original,
  },
});
