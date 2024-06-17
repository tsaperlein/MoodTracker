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
      }}
      onPress={action}
    >
      <Text style={{ color: color, fontSize: fontSize, fontFamily: fontFamily }}>{text}</Text>
    </TouchableOpacity>
  );
}
