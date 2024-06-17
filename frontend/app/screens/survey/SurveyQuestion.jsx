import React from 'react';
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
} from 'react-native';

// Colors
import colors from '../../config/colors';

// Components
import Button from '../../components/Button';
import EmojiWrapper from '../../components/EmojiWrapper';

// Header Height
const headerHEIGHT = (Dimensions.get('window').height * 12) / 100;

export default function SurveyQuestion({ navigation, number, totalQuestions, questionText }) {
  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ width: '100%', height: '100%' }}
          >
            <View
              style={{
                flex: 1 / 12,
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
            <View style={{ flex: 3 / 4, alignItems: 'center', justifyContent: 'center' }}>
              <View
                style={{
                  flex: 1 / 4,
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Text style={styles.questionText}>{questionText}</Text>
              </View>
              <View style={{ flex: 1 / 4, width: '100%' }}>
                <EmojiWrapper />
              </View>
              <View style={styles.inputContainer}>
                <View style={styles.input}>
                  <TextInput
                    style={{
                      color: colors.blue300,
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
                flex: 1 / 6,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
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
                />
              )}
            </View>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: colors.blue900,
  },
  container: {
    width: '100%',
    height: '80%',
    top: headerHEIGHT,
    alignItems: 'center',
  },
  questionText: {
    color: colors.blue300,
    fontSize: 20,
    fontFamily: Platform.OS === 'ios' ? 'outfitBold' : 'robotoBold',
    marginVertical: 10,
    marginHorizontal: '10%',
    textAlign: 'justify',
  },
  inputContainer: {
    flex: 1 / 2,
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '5%',
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
