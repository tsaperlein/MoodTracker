import React, { useState, useRef } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

// Colors
import colors from '../../constants/colors';
// Fonts
import fonts from '../../constants/fonts';
// Border
import { border } from '../../config/borderConfig';
// Shadow
import createShadow from '../../config/shadowConfig';

// Animations
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

// Authorization Services
import { useAuth } from 'context/AuthContext';

// Controller Functions
import { onSignUpPress } from '../../controllers/signInUpController';

// Header Height
import { headerHEIGHT } from '../../constants/dimensions';

export default function SignUp({ navigation, showMessage }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { signUp } = useAuth();

  const ref_input = useRef();
  const ref_input2 = useRef();
  const ref_input3 = useRef();
  const ref_input4 = useRef();

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      scrollEnabled={false}
      keyboardShouldPersistTaps="never"
    >
      <Image
        style={styles.backgroundImage}
        source={require('../../assets/images/blueGreenWaves.png')}
      />
      <View style={styles.signContainer}>
        <View style={styles.labelContainer}>
          <Animated.Text
            entering={FadeInUp.delay(100).duration(1000).springify()}
            style={styles.title}
          >
            Sign Up
          </Animated.Text>
        </View>

        <View style={styles.inputContainer}>
          <ScrollView
            contentContainerStyle={{ alignItems: 'center' }}
            automaticallyAdjustKeyboardInsets={true}
            scrollEnabled={false}
          >
            <Animated.View
              style={[styles.input, border(2)]}
              entering={FadeInDown.duration(1000).springify()}
            >
              <TextInput
                style={styles.textInput}
                placeholder="First Name*"
                placeholderTextColor={colors.blue700a70}
                autoCapitalize="none"
                value={firstName}
                onChangeText={setFirstName}
                returnKeyType="next"
                onSubmitEditing={() => ref_input.current.focus()}
              />
            </Animated.View>
            <Animated.View
              style={[styles.input, border(2)]}
              entering={FadeInDown.duration(1000).springify()}
            >
              <TextInput
                style={styles.textInput}
                placeholder="Last Name*"
                placeholderTextColor={colors.blue700a70}
                autoCapitalize="none"
                value={lastName}
                onChangeText={setLastName}
                returnKeyType="next"
                onSubmitEditing={() => ref_input2.current.focus()}
                ref={ref_input}
              />
            </Animated.View>
            <Animated.View
              style={[styles.input, border(2)]}
              entering={FadeInDown.delay(200).duration(1000).springify()}
            >
              <TextInput
                style={styles.textInput}
                placeholder="Email*"
                placeholderTextColor={colors.blue700a70}
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
                returnKeyType="next"
                onSubmitEditing={() => ref_input3.current.focus()}
                ref={ref_input2}
              />
            </Animated.View>
            <Animated.View
              style={[styles.input, border(2)]}
              entering={FadeInDown.delay(300).duration(1000).springify()}
            >
              <TextInput
                style={styles.textInput}
                placeholder="Password*"
                placeholderTextColor={colors.blue700a70}
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                returnKeyType="next"
                onSubmitEditing={() => ref_input4.current.focus()}
                ref={ref_input3}
              />
            </Animated.View>
            <Animated.View
              style={[styles.input, border(2)]}
              entering={FadeInDown.delay(400).duration(1000).springify()}
            >
              <TextInput
                style={styles.textInput}
                placeholder="Confirm Password*"
                placeholderTextColor={colors.blue700a70}
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                returnKeyType="done"
                onSubmitEditing={() =>
                  onSignUpPress(
                    firstName,
                    lastName,
                    email,
                    password,
                    confirmPassword,
                    signUp,
                    showMessage,
                    navigation
                  )
                }
                ref={ref_input4}
              />
            </Animated.View>
          </ScrollView>
        </View>

        <View style={styles.buttonContainer}>
          <Animated.View entering={FadeInDown.delay(500).duration(1000).springify()}>
            <TouchableOpacity
              style={styles.signButton}
              onPress={() =>
                onSignUpPress(
                  firstName,
                  lastName,
                  email,
                  password,
                  confirmPassword,
                  signUp,
                  showMessage,
                  navigation
                )
              }
            >
              <Text style={styles.signText}>Sign Up</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
        <View style={styles.optionsContainer}>
          <Animated.View
            entering={FadeInDown.delay(800).duration(1000).springify()}
            style={{ flexDirection: 'row' }}
          >
            <Text style={{ color: colors.blue100 }}>Already have an account?</Text>
            <TouchableOpacity
              style={{ marginLeft: '1%' }}
              onPress={() => navigation.replace('Sign In')}
            >
              <Text style={styles.option}>Sign In</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    resizeMode: 'cover',
  },
  signContainer: {
    top: headerHEIGHT,
    width: '100%',
    height: '100%',
  },
  labelContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 40,
    color: colors.green800a70,
    fontFamily: fonts.bold,
  },
  inputContainer: {
    flex: 2.5,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  input: {
    width: '90%',
    margin: '3%',
    padding: '3%',
    borderRadius: 10,
    backgroundColor: colors.blue500a50,
    fontFamily: fonts.original,
    fontSize: 15,
    borderColor: colors.blue400,
    aspectRatio: 8 / 1,
  },
  textInput: {
    color: colors.blue700,
    fontFamily: fonts.original,
  },
  buttonContainer: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signButton: {
    margin: '3%',
    backgroundColor: colors.green600,
    borderRadius: 10,
    paddingVertical: '3%',
    paddingHorizontal: '6%',
    ...createShadow({ color: colors.green800 }),
  },
  signText: {
    fontSize: 18,
    color: colors.green100,
    fontFamily: fonts.bold,
  },
  orButton: {
    color: colors.blue300,
    fontFamily: fonts.fjalla,
  },
  optionsContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: '5%',
  },
  option: {
    color: colors.blue400,
    fontWeight: '600',
  },
});
