import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  Dimensions,
  Platform,
  Alert,
} from 'react-native';

// Colors
import colors from '../../config/colors';

// Components
import Button from '../../components/Button';
import EmojiSelector from '../../components/EmojiSelector';
import KeyWordSelector from '../../components/KeyWordSelector';
import ScreenLayout from '../Layout';

export default function SurveyQuestion({ navigation, number, totalQuestions, questionText }) {
  const [emojiSelected, setEmojiSelected] = useState(false);
  const [skipConfirmation, setSkipConfirmation] = useState(false);

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
            navigation.navigate(`Q${number < totalQuestions ? number + 1 : 'Completion'}`),
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <ScreenLayout footer={false} backgroundColor={colors.blue900}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ width: '100%', height: '100%' }}
        >
          <View
            style={{
              flex: 1 / 15,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: colors.blue800,
            }}
          >
            <Text
              style={{
                color: colors.blue400,
                fontSize: 20,
                fontFamily: Platform.OS === 'ios' ? 'outfit' : 'robotoBold',
              }}
            >
              Question {number}
            </Text>
          </View>
          <View style={{ flex: 11 / 15, alignItems: 'center', justifyContent: 'center' }}>
            <View
              style={{
                flex: 1 / 6,
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text style={styles.questionText}>{questionText}</Text>
            </View>
            <View
              style={{
                flex: 1 / 6,
                width: '100%',
                backgroundColor: colors.blue800a70,
              }}
            >
              <EmojiSelector setEmojiSelected={setEmojiSelected} />
            </View>
            <View
              style={{
                flex: 2 / 6,
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <KeyWordSelector />
            </View>
            <View
              style={{
                flex: 2 / 6,
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <View style={styles.input}>
                <TextInput
                  style={{
                    color: colors.blue300,
                    height: '100%',
                    width: '100%',
                    textAlignVertical: 'top',
                    paddingTop: 0,
                    paddingBottom: 0,
                  }}
                  placeholder="Comment freely..."
                  placeholderTextColor={colors.blue400a70}
                  autoCapitalize="none"
                  multiline={true}
                  numberOfLines={10}
                  maxLength={1000}
                />
              </View>
            </View>
          </View>
          <View
            style={{
              flex: 3 / 15,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
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
                disabled={!emojiSelected}
              />
            ) : (
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
            )}
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
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
});
