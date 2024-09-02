import React from 'react';
import { StyleSheet, TouchableOpacity, Animated } from 'react-native';

// Colors
import colors from '../constants/colors';
// Icons
import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons';

export default function SideButton({ mode, onPress, animationValue }) {
  const buttonConfig = {
    edit: {
      icon: <Entypo name="camera" size={40} color={colors.blue100} />,
      backgroundColor: colors.blue700,
    },
    delete: {
      icon: <MaterialCommunityIcons name="delete" size={40} color={colors.red100} />,
      backgroundColor: colors.red600,
    },
  };

  const { icon, backgroundColor } = buttonConfig[mode];

  const animatedStyle = {
    transform: [
      { translateX: animationValue },
      {
        scale: animationValue.interpolate({
          inputRange: [-100, 0, 100],
          outputRange: [0, 1, 0],
        }),
      },
    ],
    opacity: animationValue.interpolate({
      inputRange: [-100, 0, 80, 100],
      outputRange: [0, 1, 0, 0],
    }),
  };

  return (
    <Animated.View style={[styles.sideButtonContainer, animatedStyle]}>
      <TouchableOpacity style={[styles.sideButton, { backgroundColor }]} onPress={onPress}>
        {icon}
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  sideButtonContainer: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sideButton: {
    padding: '10%',
    borderRadius: 20,
  },
});
