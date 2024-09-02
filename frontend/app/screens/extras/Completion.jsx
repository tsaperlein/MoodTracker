import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Colors
import colors from '../../constants/colors';
// Fonts
import fonts from '../../constants/fonts';

// Animations Screens
import LottieView from 'lottie-react-native';

export default function CompletionAnimation({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Questionnaires');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <LottieView
        source={require('../../assets/lottie-animations/tick-animation.json')}
        autoPlay
        loop={false}
        style={styles.animation}
      />
      <Text style={styles.message}>You have successfully {'\n'} finished the survey.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.blue900,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animation: {
    width: '40%',
    height: '25%',
  },
  message: {
    color: colors.blue200,
    fontSize: 20,
    textAlign: 'center',
    fontFamily: fonts.original,
  },
});
