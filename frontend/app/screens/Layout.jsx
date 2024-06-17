import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

// Colors
import colors from '../config/colors';

// Header and Bottom Tab Bar Heights
const headerHeight = (Dimensions.get('window').height * 12.5) / 100;
const bottomTabBarHeight = (Dimensions.get('window').height * 12) / 100;

export default function ScreenLayout({
  children,
  footer = true,
  backgroundColor = colors.blue400,
}) {
  return (
    <View style={{ flex: 1, backgroundColor: backgroundColor }}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
});
