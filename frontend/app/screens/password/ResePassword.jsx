import React, { useState } from 'react';
import { StyleSheet, Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';

// Colors
import colors from '../../constants/colors';

// Navigation
import { useNavigation } from '@react-navigation/native';

// Authorization Services
import { requestPasswordReset } from '../../services/auth';

export default function ResetPassword() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  const handlePasswordResetRequest = async () => {
    if (!email) {
      Alert.alert('Error!', 'Please enter a valid email address.');
      return;
    }

    setIsLoading(true);
    const result = await requestPasswordReset(email);
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
      <Text style={styles.description}>
        Please enter your account email to reset your password.
      </Text>
      <TextInput
        style={styles.input}
        value={email}
        placeholder="Your account email"
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        accessible={true}
        accessibilityLabel="Email Input"
        autoComplete="email"
      />
      <TouchableOpacity
        onPress={handlePasswordResetRequest}
        style={styles.resetButton}
        disabled={isLoading}
        accessible={true}
        accessibilityLabel="Request Password Reset Button"
      >
        <Text style={styles.resetButtonText}>
          {isLoading ? 'Sending...' : 'Request Password Reset'}
        </Text>
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
