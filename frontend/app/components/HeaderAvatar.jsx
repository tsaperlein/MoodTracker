import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';

// Colors
import colors from '../config/colors';
// Fonts
import fonts from '../config/fonts';

// Components
import { Avatar } from 'react-native-elements';

// Navigation
import { useNavigation } from '@react-navigation/native';

// Authorization Services
import { AuthContext } from 'context/AuthContext';
// User Services
import { fetchUserAvatar } from 'services/user';

export default function HeaderAvatar() {
  const navigation = useNavigation();
  const { authData } = useContext(AuthContext);
  const [avatarSource, setAvatarSource] = useState(null);
  const [initials, setInitials] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAvatar = async () => {
      try {
        if (authData.image) {
          setAvatarSource(authData.image.url);
        } else {
          // Fetch the user's avatar from the database
          const userAvatar = await fetchUserAvatar(authData.id);
          if (userAvatar) {
            setAvatarSource(userAvatar);
          } else {
            setAvatarSource(null);
          }
        }
      } catch (error) {
        setAvatarSource(null);
      } finally {
        setLoading(false);
      }

      // Set initials regardless of the avatar fetch result
      const userInitials = `${authData.first_name[0]}${authData.last_name[0]}`.toUpperCase();
      setInitials(userInitials);
    };

    if (authData) {
      initializeAvatar();
    }
  }, [authData.id, authData.image]);

  return loading ? (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color={colors.blue400} />
    </View>
  ) : (
    <Avatar
      key={avatarSource || 'initials'}
      size="large"
      rounded
      source={avatarSource ? { uri: avatarSource } : undefined}
      containerStyle={[styles.avatarContainer, !avatarSource && styles.initialsBackground]}
      title={!avatarSource ? initials : null}
      titleStyle={styles.initialsTitle}
      onPress={() => navigation.navigate('Profile')}
      activeOpacity={0.7}
    />
  );
}

const styles = StyleSheet.create({
  avatarContainer: {
    backgroundColor: colors.blue900a70,
    marginRight: '10%',
  },
  initialsBackground: {
    backgroundColor: colors.blue900a70,
  },
  initialsTitle: {
    color: colors.blue400,
    fontSize: 24,
    fontFamily: fonts.bold,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
