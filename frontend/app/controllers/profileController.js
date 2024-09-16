import { useState, useEffect, useRef } from 'react';
import { Alert, Animated } from 'react-native';

// Image picker
import * as ImagePicker from 'expo-image-picker';
// Async Storage
import AsyncStorage from '@react-native-async-storage/async-storage';

// Components
import { showMessage } from 'react-native-flash-message';

// Authorization Services
import { useAuth } from 'context/AuthContext';
// Profile Services
import { useProfile } from 'context/ProfileContext';

// User Services
import { updateUserImage, deleteUserImage, fetchUserAvatar } from 'services/user';
// Participation Services
import { fetchUserParticipation } from 'services/participation';
// Image utilities
import { pickImageAsync } from '../utilities/image';

export default function useProfileController() {
  const { authData, signOut, setAuthData } = useAuth();
  const { handleSaveChanges, formState, setFormState, editFinished } = useProfile();

  const [avatarUri, setAvatarUri] = useState(authData?.image?.url || null);
  const [showOverlay, setShowOverlay] = useState(false);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [participation, setParticipation] = useState(null);

  const handleInputChange = (field, value) => {
    setFormState((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const editButtonAnimation = useRef(new Animated.Value(-100)).current;
  const deleteButtonAnimation = useRef(new Animated.Value(100)).current;

  useEffect(() => {
    if (showOverlay) {
      Animated.parallel([
        Animated.timing(editButtonAnimation, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(deleteButtonAnimation, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(editButtonAnimation, {
          toValue: 100,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(deleteButtonAnimation, {
          toValue: -100,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [showOverlay]);

  useEffect(() => {
    const initializeAvatar = async () => {
      try {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert(
            'Permission required',
            'Camera roll permissions are required to change the profile picture.'
          );
          return;
        }

        if (authData.image) {
          setAvatarUri(authData.image.url);
        } else {
          const userAvatar = await fetchUserAvatar(authData.id);
          if (userAvatar) {
            setAvatarUri(userAvatar);
          } else {
            setAvatarUri(null);
          }
        }
      } catch (error) {
        setAvatarUri(null);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 3000);
      }
    };

    const fetchParticipation = async () => {
      try {
        const { participation } = await fetchUserParticipation(authData.id);
        setParticipation(participation); // Store the fetched participation percentage
      } catch (error) {
        console.error('Error fetching participation:', error);
        setParticipation(null); // Handle error by setting participation to null or a default value
      }
    };

    initializeAvatar();
    fetchParticipation(); // Fetch the participation percentage
  }, [authData.id, authData.image]);

  const handleLogout = async () => await signOut();

  const pickImage = async () => {
    try {
      const newImage = await pickImageAsync();
      if (newImage && newImage.uri) {
        setUploading(true);
        await updateUserProfileImage(newImage.uri);
        setUploading(false);
      } else {
        showMessage({
          message: 'Image selection error',
          description: 'No image was selected. Please try again.',
          type: 'danger',
        });
      }
    } catch (error) {
      showMessage({
        message: 'Image selection error',
        description: 'There was an error while picking the image. Please try again.',
        type: 'danger',
      });
      setUploading(false);
    }
  };

  const updateUserProfileImage = async (imageUri) => {
    try {
      if (!imageUri) {
        throw new Error('Invalid image URI');
      }

      const response = await updateUserImage(authData.id, imageUri);

      if (response.success) {
        const updatedAuthData = {
          ...authData,
          image: { url: imageUri },
        };

        setAuthData(updatedAuthData);
        await AsyncStorage.setItem('@AuthData', JSON.stringify(updatedAuthData));
        setShowOverlay(false);

        showMessage({
          message: 'Success',
          description: 'Profile image updated successfully.',
          type: 'success',
        });
      } else {
        throw new Error('Server failed to process the image update or returned an invalid URL');
      }
    } catch (error) {
      showMessage({
        message: 'Update error',
        description: 'Could not update the profile image.',
        type: 'danger',
      });
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteImage = async () => {
    try {
      const deleteResponse = await deleteUserImage(authData.id);

      if (deleteResponse.success) {
        const updatedAuthData = { ...authData, image: null };
        setAuthData(updatedAuthData);
        await AsyncStorage.setItem('@AuthData', JSON.stringify(updatedAuthData));
        setAvatarUri(null);
        setShowOverlay(false);

        showMessage({
          message: 'Success',
          description: 'Profile image deleted successfully.',
          type: 'success',
        });
      } else {
        showMessage({
          message: 'Deletion error',
          description: deleteResponse.message || 'Failed to delete the image.',
          type: 'danger',
        });
      }
    } catch (error) {
      showMessage({
        message: 'Deletion error',
        description: 'There was an error while deleting the image. Please try again.',
        type: 'danger',
      });
    } finally {
      setUploading(false);
    }
  };

  const handleImagePress = () => setShowOverlay((prev) => !prev);

  return {
    handleInputChange,
    formState,
    editFinished,
    avatarUri,
    loading,
    uploading,
    handleLogout,
    pickImage,
    handleDeleteImage,
    handleImagePress,
    handleSaveChanges,
    editButtonAnimation,
    deleteButtonAnimation,
    participation,
  };
}
