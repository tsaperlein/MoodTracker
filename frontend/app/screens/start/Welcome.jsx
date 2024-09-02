import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

// Colors
import colors from '../../constants/colors';
// Fonts
import fonts from '../../constants/fonts';

// Components
import Button from '../../components/Button';
import EmojiSelector from '../../components/EmojiSelector';
import LottieView from 'lottie-react-native';

// Navigation
import { useNavigation } from '@react-navigation/native';

// Authorization Services
import { AuthContext } from 'context/AuthContext';
// Mood Services
import { MoodContext } from 'context/MoodContext';

// Controller
import { useWelcomeController } from '../../controllers/welcomeController';

// Window Width and Height
import { WIDTH, HEIGHT } from '../../constants/dimensions';

export default function Welcome({ setAppNameColor }) {
  const navigation = useNavigation();
  const [selectedMood, setSelectedMood] = useState(null);
  const { authData, signOut } = useContext(AuthContext);
  const { setHasChosenMood } = useContext(MoodContext);

  // Get controller functions
  const { handleContinue, handleSkip, handleLogout, getRandomAnimation } = useWelcomeController(
    authData,
    setHasChosenMood,
    navigation,
    signOut
  );

  // Call getRandomAnimation only once and store the result in state
  const [animation, setAnimation] = useState(null);

  useEffect(() => {
    if (animation === null) {
      const initialAnimation = getRandomAnimation();
      setAnimation(initialAnimation);
    }
  }, [getRandomAnimation]);

  if (!animation) {
    return null;
  }

  return (
    <View style={[styles.container, { backgroundColor: animation.colors.backgroundColor }]}>
      <LottieView
        source={animation.source}
        autoPlay
        loop
        style={{
          position: 'absolute',
          bottom: 0,
          width: WIDTH,
          height: animation.height,
        }}
      />
      <View style={styles.greetingContainer}>
        <Text style={[styles.text, { color: animation.colors.greetingTextColor }]}>
          Hello, {authData.first_name}
        </Text>
        <Text style={[styles.question, { color: animation.colors.greetingTextColor }]}>
          How are you feeling today?
        </Text>
      </View>
      <View
        style={[
          styles.emojiContainer,
          { backgroundColor: animation.colors.emojiContainerBackgroundColor },
        ]}
      >
        <EmojiSelector
          setEmojiSelected={setSelectedMood}
          initialMood={null}
          disabled={false}
          emojiColor={animation.colors.emojiColor}
          emojiBackgroundColor={animation.colors.emojiBackgroundColor}
          underTextColor={animation.colors.underTextColor}
        />
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.buttonRow}>
          <Button
            buttonColor={animation.colors.buttonColor}
            text="Skip"
            color={animation.colors.buttonTextColor}
            width={WIDTH / 4.2}
            height={HEIGHT / 18}
            fontSize={18}
            fontFamily={fonts.bold}
            action={handleSkip}
          />
          <Button
            buttonColor={animation.colors.buttonColor}
            text="Continue"
            color={animation.colors.buttonTextColor}
            width={WIDTH / 4.2}
            height={HEIGHT / 18}
            fontSize={18}
            fontFamily={fonts.bold}
            disabled={!selectedMood}
            action={() => {
              handleContinue(selectedMood);
              setAppNameColor(colors.blue600);
            }}
          />
        </View>
        <View style={styles.logoutContainer}>
          <Text style={[styles.notYouText, { color: animation.colors.logoutTextColor }]}>
            Not you?
          </Text>
          <TouchableOpacity onPress={handleLogout}>
            <Text style={[styles.signOutText, { color: animation.colors.logoutTextColor }]}>
              Sign Out
            </Text>
          </TouchableOpacity>
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
  greetingContainer: {
    flex: 1.5,
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: '5%',
  },
  text: {
    fontSize: 22,
    fontFamily: fonts.bold,
    textAlign: 'center',
    marginBottom: '5%',
  },
  question: {
    fontSize: 24,
    fontFamily: fonts.bold,
    textAlign: 'center',
  },
  emojiContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flex: 2,
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonRow: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  logoutContainer: {
    flex: 1 / 2,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  notYouText: {
    fontSize: 18,
    fontFamily: fonts.original,
  },
  signOutText: {
    fontSize: 18,
    marginLeft: 5,
    fontFamily: fonts.bold,
  },
});
