import React from 'react';
import { View, StyleSheet } from 'react-native';

// Colors
import colors from '../constants/colors';
// Fonts
import fonts from '../constants/fonts';

// Components
import Button from './Button';

export default function SurveyButtons({
  navigation,
  number,
  totalQuestions,
  mode,
  answerSelected,
  onSubmit,
}) {
  return (
    <View style={styles.buttonContainer}>
      {mode === 'past' && (
        <Button
          text="Exit"
          buttonColor={colors.blue500a70}
          color={colors.blue100}
          padding={'3%'}
          margin={'3%'}
          fontFamily={fonts.bold}
          fontSize={18}
          action={() => navigation.navigate('Questionnaires')}
        />
      )}
      {number < totalQuestions ? (
        <Button
          text="Continue"
          buttonColor={colors.blue100}
          color={colors.blue600}
          padding={'3%'}
          margin={'3%'}
          fontFamily={fonts.bold}
          fontSize={18}
          action={() => navigation.navigate(`Q${number + 1}`)}
          disabled={mode === 'current' && !answerSelected}
        />
      ) : mode === 'current' ? (
        <Button
          text="Submit"
          buttonColor={colors.blue600}
          color={'white'}
          padding={'3%'}
          margin={'3%'}
          fontFamily={fonts.bold}
          fontSize={18}
          action={onSubmit}
          disabled={!answerSelected}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
