import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

export default function Button({
  buttonColor = 'blue',
  width = undefined,
  height = undefined,
  margin = undefined,
  padding = undefined,
  text = 'Press Me',
  color = 'white',
  borderRadius = 10,
  fontSize,
  fontFamily,
  action,
  disabled = false,
}) {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: buttonColor,
        width: width,
        height: height,
        margin: margin,
        padding: padding,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: borderRadius,
        opacity: disabled ? 0.5 : 1,
      }}
      onPress={action}
      disabled={disabled}
    >
      <Text style={{ color: color, fontSize: fontSize, fontFamily: fontFamily }}>{text}</Text>
    </TouchableOpacity>
  );
}
