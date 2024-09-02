import React from 'react';
import { TouchableOpacity } from 'react-native';

// Colors
import colors from '../constants/colors';
// Icons
import { Ionicons } from '@expo/vector-icons';

// Navigation
import { useNavigation } from '@react-navigation/native';

export default function GoBackButton({ mode }) {
  const navigation = useNavigation();
  const iconName = mode === 'close' ? 'close' : 'arrow-back';

  return (
    <TouchableOpacity style={{ position: 'absolute' }} onPress={() => navigation.goBack()}>
      <Ionicons name={iconName} size={30} color={colors.blue300} />
    </TouchableOpacity>
  );
}
