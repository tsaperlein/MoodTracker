import React, { useState } from 'react';
import { StyleSheet, Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';

// Colors
import colors from '../../constants/colors';
// Fonts
import fonts from '../../constants/fonts';
// Border
import { border } from '../../config/borderConfig';

// Components
import ScreenLayout from '../Layout';
import Button from '../../components/Button';

// Authorization Services
import { resetPassword } from '../../services/auth';

export default function PasswordReset({ route, navigation }) {
  // const { token = null } = route.params;
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handlePasswordReset = async () => {
    if (newPassword !== confirmPassword) {
      Alert.alert('Error!', 'Passwords do not match.');
      return;
    }

    setIsLoading(true);
    const result = await resetPassword(token, newPassword);
    setIsLoading(false);

    if (result.success) {
      Alert.alert('Success!', result.message);
      navigation.navigate('Sign In');
    } else {
      Alert.alert('Error!', result.message);
    }
  };

  return (
    <ScreenLayout footer={false} backgroundColor={colors.green500a70}>
      <View style={[styles.part, { flex: 2, justifyContent: 'space-evenly' }]}>
        <Text style={styles.description}>Enter your new password:</Text>
        <TextInput
          style={[styles.input, border(2)]}
          value={newPassword}
          placeholder="New password"
          placeholderTextColor={colors.green600}
          onChangeText={setNewPassword}
          secureTextEntry
          autoCapitalize="none"
          keyboardType="default"
          accessible={true}
          accessibilityLabel="New Password Input"
          autoComplete="password-new"
          returnKeyType="next"
        />
        <TextInput
          style={[styles.input, border(2)]}
          value={confirmPassword}
          placeholder="Confirm new password"
          placeholderTextColor={colors.green600}
          onChangeText={setConfirmPassword}
          secureTextEntry
          autoCapitalize="none"
          keyboardType="default"
          accessible={true}
          accessibilityLabel="Confirm Password Input"
          autoComplete="password-new"
          returnKeyType="next"
          onSubmitEditing={() => handlePasswordReset()}
        />
      </View>
      <View style={[styles.part, { justifyContent: 'flex-start' }]}>
        <Button
          buttonColor={colors.blue500}
          padding={'4%'}
          text="Reset Password Button"
          color={colors.blue100}
          fontSize={17}
          fontFamily={fonts.bold}
          action={handlePasswordReset}
          disabled={isLoading}
        />
      </View>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  part: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  description: {
    width: '90%',
    color: colors.blue600,
    fontSize: 24,
    fontFamily: fonts.bold,
    textAlign: 'center',
  },
  input: {
    width: '90%',
    padding: '4%',
    borderRadius: 10,
    color: colors.green700,
    backgroundColor: colors.green500,
    fontSize: 16,
    fontFamily: fonts.medium,
    borderColor: colors.green600a50,
  },
});
