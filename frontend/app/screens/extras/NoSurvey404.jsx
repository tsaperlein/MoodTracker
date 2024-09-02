import React, { useRef, useEffect } from 'react';
import { StyleSheet, View, Animated, Dimensions, Easing } from 'react-native';

// Colors
import colors from '../../config/colors';
// Fonts
import fonts from '../../config/fonts';

// Components
import LottieView from 'lottie-react-native';
import GoBackButton from '../../components/GoBackButton';

// Window Width
const width = Dimensions.get('window').width;
// Animation Width
const animWidth = 4 * width;

export default function NoSurvey404() {
  const translateX = useRef(new Animated.Value(-animWidth)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(translateX, {
          toValue: animWidth, // Move to the right edge
          duration: 0, // Instantly move it to the right off-screen
          useNativeDriver: true,
        }),
        Animated.timing(translateX, {
          toValue: -animWidth, // Move from right to left
          duration: 13000, // Adjust the duration as needed
          easing: Easing.linear, // Use linear easing
          useNativeDriver: true,
        }),
      ])
    );

    animation.start();
  }, [translateX]);

  return (
    <View style={styles.container}>
      <View
        style={{
          position: 'absolute',
          top: 0,
          marginTop: '12%',
          marginLeft: '4%',
        }}
      >
        <GoBackButton mode="close" />
      </View>
      <LottieView
        source={require('../../assets/lottie-animations/404-dino-animation.json')}
        autoPlay
        loop={true}
        style={styles.animation}
      />
      <View style={styles.textContainer}>
        <Animated.Text
          style={[
            styles.text,
            {
              transform: [{ translateX }],
            },
          ]}
        >
          NO SURVEY FOR YOU YET. WE WILL NOTIFY YOU!
        </Animated.Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.blue900,
    justifyContent: 'center',
  },
  animation: {
    height: '80%',
    width: '100%',
  },
  textContainer: {
    position: 'absolute',
    bottom: '15%',
    width: animWidth,
    overflow: 'hidden',
  },
  text: {
    fontSize: 36,
    color: colors.blue400,
    fontFamily: fonts.dinoFont,
    whiteSpace: 'nowrap',
  },
});
