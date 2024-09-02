import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';

// Colors
import colors from '../constants/colors';
// Fonts
import fonts from '../constants/fonts';

// Components
import { Avatar } from 'react-native-elements';

// Navigation
import { useNavigation } from '@react-navigation/native';

// Authorization Services
import { AuthContext } from 'context/AuthContext';

// User Services
import { fetchUserAvatar } from 'services/user';

// Window height
import { HEIGHT } from '../constants/dimensions';

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
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      }

      // Set initials regardless of the avatar fetch result
      const userInitials = `${authData.first_name[0]}${authData.last_name[0]}`.toUpperCase();
      setInitials(userInitials);
    };

    if (authData) {
      initializeAvatar();
    }
  }, [authData]);

  return loading ? (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color={colors.blue800} />
    </View>
  ) : (
    <Avatar
      key={avatarSource || 'initials'}
      size={HEIGHT / 12}
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
    marginTop: '4%',
    marginRight: '28%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
