import React from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

// Colors
import colors from '../constants/colors';

// Window height
import { HEIGHT } from '../constants/dimensions';

// Header and Bottom Tab Bar Heights
const headerHeight = (HEIGHT * 12.5) / 100;
const bottomTabBarHeight = (HEIGHT * 12) / 100;

export default function ScreenLayout({
  children,
  footer = true,
  backgroundColor = colors.blue400,
  screenName = null,
}) {
  const content = (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.content}
    >
      <View
        style={[
          styles.container,
          {
            height: footer ? HEIGHT - headerHeight - bottomTabBarHeight : HEIGHT - headerHeight,
            top: headerHeight,
          },
        ]}
      >
        {children}
      </View>
    </KeyboardAvoidingView>
  );

  return (
    <View style={{ flex: 1, backgroundColor }}>
      {screenName !== 'Home' ? (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>{content}</TouchableWithoutFeedback>
      ) : (
        content
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    width: '100%',
    height: '100%',
  },
  container: {
    width: '100%',
    alignItems: 'center',
    overflow: 'hidden',
  },
});
