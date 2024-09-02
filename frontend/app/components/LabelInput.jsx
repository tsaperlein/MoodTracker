import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';

// Colors
import colors from '../constants/colors';
// Fonts
import fonts from '../constants/fonts';
// Border
import { border } from '../config/borderConfig';

export default function LabelInput({ label, value, onChangeText, keyboardType = 'default' }) {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <View style={[styles.container, border(2), isFocused && styles.containerFocused]}>
      <Text style={[styles.label, (isFocused || value) && styles.labelFocused]}>{label}</Text>
      <TextInput
        style={[styles.inputField, isFocused && styles.inputFieldFocused]}
        value={value}
        onChangeText={onChangeText}
        onFocus={handleFocus}
        onBlur={handleBlur}
        keyboardType={keyboardType}
        placeholder={isFocused ? '' : `Write here your ${label}`}
        placeholderTextColor={colors.blue800a70}
        enablesReturnKeyAutomatically={true}
        autoCorrect={false}
        autoCapitalize="none"
        inputMode={label === 'Email' ? 'email' : 'text'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.blue900a50,
    padding: '3%',
    marginVertical: '2%',
    borderRadius: 14,
    borderColor: 'transparent',
  },
  containerFocused: {
    borderColor: colors.blue800,
  },
  label: {
    color: colors.blue400a50,
    fontSize: 13,
    fontFamily: fonts.original,
  },
  inputField: {
    fontSize: 17,
    color: colors.blue300,
    fontFamily: fonts.original,
    marginTop: '1%',
  },
});
