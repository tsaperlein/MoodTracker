import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

// Colors
import colors from '../config/colors';

// Header and Bottom Tab Bar Heights
const headerHeight = (Dimensions.get('window').height * 12.5) / 100;
const bottomTabBarHeight = (Dimensions.get('window').height * 12) / 100;

export default function ScreenLayout({
  children,
  footer = true,
  backgroundColor = colors.blue500,
  screenName = null, // Add screenName as a prop
}) {
  const content = (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ width: '100%', height: '100%' }}
    >
      <View
        style={[
          styles.container,
          {
            height: footer
              ? Dimensions.get('window').height - headerHeight - bottomTabBarHeight
              : Dimensions.get('window').height - headerHeight,
            top: headerHeight,
          },
        ]}
      >
        {children}
      </View>
    </KeyboardAvoidingView>
  );

  return (
    <View style={{ flex: 1, backgroundColor: backgroundColor }}>
      {screenName !== 'Home' ? (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>{content}</TouchableWithoutFeedback>
      ) : (
        content
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    overflow: 'hidden',
  },
});
