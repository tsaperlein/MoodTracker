import React from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  Platform,
  TouchableOpacity,
} from 'react-native';

// Colors
import colors from '../../config/colors';
// Shadow
import createShadow from '../../config/shadowStyle';
// Icons
import { FontAwesome } from '@expo/vector-icons';

// Animations
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

// Header Height
const headerHEIGHT = (Dimensions.get('window').height * 12) / 100;

export default function SignIn({ navigation }) {
  return (
    <View style={styles.container}>
      <Image
        style={{
          height: '100%',
          width: '100%',
          position: 'absolute',
          resizeMode: 'cover',
        }}
        source={require('../../assets/images/blueGreenWaves.png')}
      />
      <View
        style={{
          top: headerHEIGHT,
          width: '100%',
          height: '100%',
        }}
      >
        <View style={styles.labelContainer}>
          <Animated.Text
            entering={FadeInUp.delay(100).duration(1000).springify()}
            style={styles.title}
          >
            Sign In
          </Animated.Text>
        </View>

        <View style={styles.inputContainer}>
          <Animated.View
            style={styles.input}
            entering={FadeInDown.delay(200).duration(1000).springify()}
          >
            <TextInput
              style={styles.textInput}
              placeholder="Email"
              placeholderTextColor={colors.blue600a70}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </Animated.View>
          <Animated.View
            style={styles.input}
            entering={FadeInDown.delay(400).duration(1000).springify()}
          >
            <TextInput
              style={styles.textInput}
              placeholder="Password"
              placeholderTextColor={colors.blue600a70}
              secureTextEntry
            />
          </Animated.View>
        </View>

        <View style={styles.buttonContainer}>
          <Animated.View entering={FadeInDown.delay(500).duration(1000).springify()}>
            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => navigation.replace('Main Navigator')}
            >
              <Text
                style={{
                  fontSize: 17,
                  color: colors.white,
                  fontFamily: Platform.OS === 'ios' ? 'outfitBold' : 'roboto',
                }}
              >
                Login
              </Text>
            </TouchableOpacity>
          </Animated.View>
          <Animated.View
            entering={FadeInDown.delay(550).duration(1000).springify()}
            style={{ marginBottom: '3%' }}
          >
            <Text
              style={{
                color: colors.blue300,
                fontFamily: Platform.OS === 'ios' ? 'fjallaOne' : 'roboto',
              }}
            >
              - OR -
            </Text>
          </Animated.View>
          <Animated.View entering={FadeInDown.delay(600).duration(1000).springify()}>
            <View>
              <FontAwesome.Button name="google" backgroundColor="#4285F4">
                Continue With Google
              </FontAwesome.Button>
            </View>
          </Animated.View>
        </View>

        <View style={styles.optionsContainer}>
          <Animated.View
            entering={FadeInDown.delay(700).duration(1000).springify()}
            style={{ flexDirection: 'row' }}
          >
            <Text style={{ color: colors.blue100 }}>Don't have an account?</Text>
            <TouchableOpacity
              style={{ marginLeft: '1%' }}
              onPress={() => navigation.replace('Sign Up')}
            >
              <Text style={{ color: colors.blue400, fontWeight: '600' }}>Sign Up</Text>
            </TouchableOpacity>
          </Animated.View>
          <Animated.View
            entering={FadeInDown.delay(750).duration(1000).springify()}
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '4%',
            }}
          >
            <Text style={{ color: colors.blue100, marginBottom: '0.5%' }}>
              Forgot your password?
            </Text>
            <TouchableOpacity>
              <Text style={{ color: colors.blue400, fontWeight: '600' }}>Reset Password</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  title: {
    fontSize: 40,
    color: colors.purple800,
    fontFamily: Platform.OS === 'ios' ? 'outfitBold' : 'robotoBold',
    paddingBottom: '5%',
  },
  inputContainer: {
    flex: 0.8,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '90%',
    margin: '4%',
    padding: '3%',
    borderRadius: 10,
    backgroundColor: colors.blue500a50,
    fontFamily: Platform.OS === 'ios' ? 'outfit' : 'robotoBold',
    fontSize: 15,
    borderWidth: '2%',
    borderColor: colors.blue400,
  },
  textInput: {
    color: colors.blue700,
    fontFamily: Platform.OS === 'ios' ? 'outfit' : 'roboto',
  },
  buttonContainer: {
    flex: 0.8,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButton: {
    margin: '3%',
    backgroundColor: colors.green500,
    borderRadius: 10,
    paddingVertical: '3%',
    paddingHorizontal: '6%',
    ...createShadow({ color: colors.green600 }),
  },
  optionsContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: '5%',
  },
  options: {
    flexDirection: 'row',
  },
});
