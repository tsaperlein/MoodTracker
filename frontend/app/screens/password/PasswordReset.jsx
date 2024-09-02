import React, { useState } from 'react';
import { StyleSheet, Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';

// Colors
import colors from '../../constants/colors';

// Navigation
import { useNavigation } from '@react-navigation/native';

// Authorization Services
import { resetPassword } from '../../services/auth';

export default function PasswordReset({ route }) {
  const { token } = route.params;
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

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
    <View style={styles.container}>
      <Text style={styles.description}>Enter your new password:</Text>
      <TextInput
        style={styles.input}
        value={newPassword}
        placeholder="New password"
        onChangeText={setNewPassword}
        secureTextEntry
        autoCapitalize="none"
        accessible={true}
        accessibilityLabel="New Password Input"
      />
      <TextInput
        style={styles.input}
        value={confirmPassword}
        placeholder="Confirm new password"
        onChangeText={setConfirmPassword}
        secureTextEntry
        autoCapitalize="none"
        accessible={true}
        accessibilityLabel="Confirm Password Input"
      />
      <TouchableOpacity
        onPress={handlePasswordReset}
        style={styles.resetButton}
        disabled={isLoading}
        accessible={true}
        accessibilityLabel="Reset Password Button"
      >
        <Text style={styles.resetButtonText}>{isLoading ? 'Resetting...' : 'Reset Password'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.blue400,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  description: {
    color: colors.white,
    marginBottom: 20,
    fontSize: 16,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    backgroundColor: '#f0f0f0',
  },
  resetButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  resetButtonText: {
    color: '#fff',
  },
});
