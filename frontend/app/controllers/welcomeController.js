import { Alert } from 'react-native';

// Welcome Mood Services
import { submitWelcomeMood } from 'services/welcomeMood';

// Animation Configuration
import { animations } from '../config/animationConfig';

export const useWelcomeController = (authData, setHasChosenMood, navigation, signOut) => {
  const handleSubmitMood = async (moodType) => {
    try {
      const userId = authData.id;
      const result = await submitWelcomeMood(userId, moodType);

      if (result.success) {
        setHasChosenMood(true);
        navigation.replace('Main Navigator');
      } else {
        Alert.alert('Error', result.message);
      }
    } catch (error) {
      console.error('Error submitting mood:', error);
      Alert.alert('Error', 'An error occurred while submitting your mood.');
    }
  };

  const handleContinue = (selectedMood) => {
    if (selectedMood) {
      handleSubmitMood(selectedMood);
    }
  };

  const handleSkip = () => {
    Alert.alert(
      'Skip Welcome Mood',
      'Are you sure you want to skip? No welcome mood will be recorded.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'OK',
          onPress: () => handleSubmitMood('nothing'),
        },
      ]
    );
  };

  const handleLogout = async () => await signOut();

  const getRandomAnimation = () => {
    const keys = Object.keys(animations);
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    return animations[randomKey];
  };

  return {
    handleSubmitMood,
    handleContinue,
    handleSkip,
    handleLogout,
    getRandomAnimation,
  };
};
