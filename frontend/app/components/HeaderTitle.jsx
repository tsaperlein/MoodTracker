import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

// Colors
import colors from '../constants/colors';
// Fonts
import fonts from '../constants/fonts';
// Icons
import { MaterialCommunityIcons, FontAwesome6 } from '@expo/vector-icons';

// Controller
import { useHeaderTitleController } from '../controllers/mainNavigatorController';

export default function HeaderTitle() {
  const {
    authData,
    iconName,
    iconColor,
    backgroundColor,
    streakText,
    streakContainerBackground,
    streakTextColor,
    streakIconColor,
    streakIcon,
  } = useHeaderTitleController();

  if (!authData) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.headerTitleContainer}>
      <Text style={styles.homeLabel}>Hello, {authData.first_name}</Text>
      <View style={styles.featureContainer}>
        <View style={[styles.feature, { backgroundColor: streakContainerBackground }]}>
          <MaterialCommunityIcons name={streakIcon} size={19} color={streakIconColor} />
          <Text style={[styles.featureText, { color: streakTextColor }]}>{streakText}</Text>
        </View>
        <View style={[styles.feature, { backgroundColor }]}>
          <FontAwesome6 name={iconName} size={19} color={iconColor} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  avatarContainer: {
    flex: 1,
    width: '65%',
    marginRight: '10%',
    borderRadius: 50,
    overflow: 'hidden',
  },
  headerTitleContainer: {
    flex: 1,
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  homeLabel: {
    flex: 1,
    color: colors.blue800,
    fontSize: 20,
    fontFamily: fonts.bold,
    textAlign: 'center',
  },
  featureContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  feature: {
    flexDirection: 'row',
    height: '100%',
    margin: '2%',
    paddingHorizontal: '4%',
    borderRadius: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  featureText: {
    fontSize: 13,
    fontFamily: fonts.medium,
    marginLeft: '3%',
  },
});
