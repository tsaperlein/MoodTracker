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
import { onSignInPress } from '../../controllers/signInUpController';

// Header Height
import { headerHEIGHT } from '../../constants/dimensions';

export default function SignIn({ navigation, showMessage }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { signIn } = useAuth();

  const ref_input = useRef();

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
            Sign In
          </Animated.Text>
        </View>

        <View style={styles.inputContainer}>
          <ScrollView
            contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}
            automaticallyAdjustKeyboardInsets={true}
            scrollEnabled={false}
            keyboardShouldPersistTaps="handled"
          >
            <Animated.View
              style={[styles.input, border(2)]}
              entering={FadeInDown.delay(200).duration(1000).springify()}
            >
              <TextInput
                style={styles.textInput}
                placeholder="Email"
                placeholderTextColor={colors.blue700a50}
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
                returnKeyType="next"
                onSubmitEditing={() => ref_input.current.focus()}
              />
            </Animated.View>
            <Animated.View
              style={[styles.input, border(2)]}
              entering={FadeInDown.delay(400).duration(1000).springify()}
            >
              <TextInput
                style={styles.textInput}
                placeholder="Password"
                placeholderTextColor={colors.blue700a50}
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                ref={ref_input}
                returnKeyType="done"
                onSubmitEditing={() => onSignInPress(email, password, signIn, showMessage)}
              />
            </Animated.View>
          </ScrollView>
        </View>

        <View style={styles.buttonContainer}>
          <Animated.View entering={FadeInDown.delay(500).duration(1000).springify()}>
            <TouchableOpacity
              style={styles.signButton}
              onPress={() => onSignInPress(email, password, signIn, showMessage)}
            >
              <Text style={styles.signText}>Login</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>

        <View style={styles.optionsContainer}>
          <Animated.View
            entering={FadeInDown.delay(600).duration(1000).springify()}
            style={{ flexDirection: 'row' }}
          >
            <Text style={{ color: colors.blue100 }}>Don't have an account?</Text>
            <TouchableOpacity
              style={{ marginLeft: '1%' }}
              onPress={() => navigation.replace('Sign Up')}
            >
              <Text style={styles.option}>Sign Up</Text>
            </TouchableOpacity>
          </Animated.View>
          <Animated.View
            entering={FadeInDown.delay(650).duration(1000).springify()}
            style={styles.forgotPasswordContainer}
          >
            <Text style={{ color: colors.blue100, marginBottom: '0.5%' }}>
              Forgot your password?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('RequestPasswordReset')}>
              <Text style={styles.option}>Reset Password</Text>
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
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  input: {
    width: '90%',
    margin: '4%',
    padding: '3%',
    borderRadius: 10,
    backgroundColor: colors.blue500a50,
    fontFamily: fonts.original,
    fontSize: 15,
    borderColor: colors.blue400,
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
  forgotPasswordContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '4%',
  },
  option: {
    color: colors.blue400,
    fontWeight: '600',
  },
});
