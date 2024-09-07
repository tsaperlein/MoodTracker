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
import { requestPasswordReset } from '../../services/auth';

export default function ResetPassword({ navigation }) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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
    <ScreenLayout footer={false} backgroundColor={colors.green500a70}>
      <View style={styles.part}>
        <Text style={styles.description}>
          Please enter your email address to reset your password.
        </Text>
      </View>
      <View style={styles.part}>
        <TextInput
          style={[styles.input, border(2)]}
          value={email}
          placeholder="example@gmail.com"
          placeholderTextColor={colors.green600}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          accessible={true}
          accessibilityLabel="Email Input"
          autoComplete="email"
          returnKeyType="done"
          onSubmitEditing={() => handlePasswordResetRequest()}
        />
      </View>
      <View style={[styles.part, { justifyContent: 'flex-start' }]}>
        <Button
          buttonColor={colors.blue500}
          padding={'4%'}
          text="Request Password Reset"
          color={colors.blue100}
          fontSize={17}
          fontFamily={fonts.bold}
          action={handlePasswordResetRequest}
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
