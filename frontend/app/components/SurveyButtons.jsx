import React from 'react';
import { View, Platform } from 'react-native';

// Colors
import colors from '../config/colors';

// Components
import Button from './Button';

export default function SurveyButtons({
  navigation,
  number,
  totalQuestions,
  mode,
  emojiSelected,
  handleSkip,
}) {
  return (
    <View
      style={{
        flex: 3 / 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {mode === 'current' && (
        <Button
          text="Skip"
          buttonColor={colors.blue500}
          color={colors.blue100}
          padding={'3%'}
          margin={'3%'}
          fontFamily={Platform.OS === 'ios' ? 'outfitBold' : 'robotoBold'}
          fontSize={16}
          action={handleSkip}
        />
      )}
      {mode === 'past' && (
        <Button
          text="Exit"
          buttonColor={colors.blue500}
          color={colors.blue100}
          padding={'3%'}
          margin={'3%'}
          fontFamily={Platform.OS === 'ios' ? 'outfitBold' : 'robotoBold'}
          fontSize={16}
          action={() => navigation.navigate('Questionnaires')}
        />
      )}
      {number < totalQuestions ? (
        <Button
          text="Continue"
          buttonColor={colors.blue200}
          color={colors.blue600}
          padding={'3%'}
          margin={'3%'}
          fontFamily={Platform.OS === 'ios' ? 'outfitBold' : 'robotoBold'}
          fontSize={16}
          action={() => navigation.navigate(`Q${number + 1}`)}
          disabled={mode === 'current' && !emojiSelected}
        />
      ) : mode === 'current' ? (
        <Button
          text="Submit"
          buttonColor={colors.blue600}
          color={'white'}
          padding={'3%'}
          margin={'3%'}
          fontSize={16}
          fontFamily={Platform.OS === 'ios' ? 'outfitBold' : 'robotoBold'}
          action={() => navigation.navigate('Completion')}
          disabled={!emojiSelected}
        />
      ) : null}
    </View>
  );
}
